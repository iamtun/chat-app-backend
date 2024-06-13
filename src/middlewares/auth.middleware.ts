import { NextFunction, Request, Response } from 'express';
import admin from '../configs/firebase-admin';
import userModel from '../models/user.model';
import {
	NoTokenProvidedError,
	TokenExpiredError,
	TokenInvalidError,
} from '../errors';
import redis from '../cache';
import { TIME_EXPIRED_CACHE } from '../utils/constant';

const AuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authorizationToken = req.headers.authorization;
	if (!authorizationToken) {
		return next(new NoTokenProvidedError('No token provided'));
	}

	const [_, token] = authorizationToken.split('Bearer ');

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const { user_id, name, picture, firebase } = decodedToken;
		const { sign_in_provider } = firebase;
		const userCached = await redis.get(user_id);

		if (userCached) {
			req.user = JSON.parse(userCached);
			next();
		} else {
			const userDB = await userModel.findOne({ firebase_id: user_id });
			if (userDB) {
				req.user = userDB;
				await redis.setex(user_id, TIME_EXPIRED_CACHE, JSON.stringify(userDB));
				next();
				return;
			} else {
				const userCreated = new userModel({
					firebase_id: user_id,
					full_name: name,
					avatar: picture,
					login_provider: sign_in_provider,
				});

				await userCreated.save();
				await redis.setex(
					user_id,
					TIME_EXPIRED_CACHE,
					JSON.stringify(userCreated),
				);
				req.user = userCreated;
				next();
			}
		}
	} catch (error: any) {
		if (error.errorInfo.code === 'auth/id-token-expired') {
			next(new TokenExpiredError('Token expired'));
		}

		if (error.errorInfo.code === 'auth/argument-error') {
			next(new TokenInvalidError('Token invalid'));
		}
	}
};

export default AuthMiddleware;
