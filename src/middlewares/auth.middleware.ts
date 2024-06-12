import { NextFunction, Request, Response } from 'express';
import admin from '../configs/firebase-admin';
import userModel from '../models/user.model';
import { TokenExpiredError, TokenInvalidError } from '../errors';

const AuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authorizationToken = req.headers.authorization;
	if (!authorizationToken) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const [_, token] = authorizationToken.split('Bearer ');

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const { user_id, name, picture, firebase } = decodedToken;
		const { sign_in_provider } = firebase;
		const user = await userModel.findOne({ firebase_id: user_id });

		if (user) {
			req.user = user;
			next();
		} else {
			const userCreated = new userModel({
				firebase_id: user_id,
				full_name: name,
				avatar: picture,
				login_provider: sign_in_provider,
			});

			await userCreated.save();
			req.user = userCreated;
			next();
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
