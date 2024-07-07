import { NextFunction, Request, Response } from 'express';
import friendService from '../services/friend.service';
import { createResponse } from '../utils';
import { FriendExistedError } from '../errors';
import { StatusCodes } from 'http-status-codes';

class FriendController {
	constructor() {}

	async createFriend(req: Request, res: Response, next: NextFunction) {
		const { user } = req;
		const { receiver_id, content = '' } = req.body;

		const isFriend = user.friend_ids.includes(receiver_id);

		if (isFriend) {
			return next(new FriendExistedError('Friend existed'));
		}

		const friend = await friendService.createFriend(
			user._id,
			receiver_id,
			content,
		);

		return createResponse(res, StatusCodes.CREATED, friend, next);
	}

	async getFriendList(req: Request, res: Response, next: NextFunction) {
		const { user } = req;
		const friends = await friendService.getFriendList(user._id);
		return createResponse(res, StatusCodes.OK, friends, next);
	}

	async handleRequestFriend(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const { status } = req.body;

		try {
			if (status) {
				await friendService.acceptFriend(id);
			} else {
				await friendService.rejectFriend(id);
			}
			return createResponse(res, StatusCodes.CREATED, {}, next);
		} catch (error) {
			next(error);
		}
	}
}

const friendController = new FriendController();
export default friendController;
