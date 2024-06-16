import { NextFunction, Request, Response } from 'express';
import admin from '../configs/firebase-admin';
import {
	NoTokenProvidedError,
	TokenExpiredError,
	TokenInvalidError,
} from '../errors';
import userService from '../services/user.service';

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
		const {
			user_id: firebaseUserId,
			name,
			picture = '',
			firebase,
		} = decodedToken;
		const { sign_in_provider } = firebase;
		const userCached = await userService.findUserInCacheById(firebaseUserId);

		if (userCached) {
			req.user = JSON.parse(userCached);
			next();
		} else {
			const userDB = await userService.findUserByFirebaseId(firebaseUserId);
			if (userDB) {
				req.user = userDB;
				await userService.saveUserInCache(firebaseUserId, userDB);

				next();
				return;
			} else {
				const userCreated = await userService.createUser({
					avatar: picture,
					firebase_id: firebaseUserId,
					full_name: name,
					login_provider: sign_in_provider,
				});

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
