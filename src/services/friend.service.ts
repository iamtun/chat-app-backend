import mongoose from 'mongoose';
import { FriendReqNotFountError, UserNotFoundError } from '../errors';
import friendModel from '../models/friend.model';
import userModel from '../models/user.model';
import userService from './user.service';

class FriendService {
	constructor() {}

	async createFriend(senderId: string, receiverId: string, content: string) {
		const friend = await friendModel.create({
			sender: senderId,
			receiver: receiverId,
			content,
		});

		return friend;
	}

	async getFriendList(receiverId: string) {
		const friends = await friendModel.find({ receiver: receiverId }).populate({
			path: 'sender',
			select: {
				full_name: 1,
				avatar: 1,
			},
		});

		return friends;
	}

	async findFriendReqById(friendId: string) {
		const friendReq = await friendModel.findById(friendId);
		if (!friendReq) {
			throw new FriendReqNotFountError('Friend not found');
		}

		return friendReq;
	}

	async acceptFriend(friend_id: string) {
		try {
			const friendReq = await friendService.findFriendReqById(friend_id);

			const senderId = friendReq.sender + '';
			const receiverId = friendReq.receiver + '';

			const sender: any = await userModel.findById(senderId);
			if (!sender) {
				throw new UserNotFoundError(`Sender with id ${senderId} not found`);
			}

			const receiver: any = await userModel.findById(receiverId);
			if (!receiver) {
				throw new UserNotFoundError(`Receiver with id ${receiverId} not found`);
			}

			if (sender && receiver) {
				sender.friend_ids.push(receiverId);
				receiver.friend_ids.push(senderId);
				await sender.save();
				await receiver.save();
				await this.rejectFriend(friend_id);
				await userService.saveUserInCache(sender.firebase_id, sender);
				await userService.saveUserInCache(receiver.firebase_id, receiver);
			}
		} catch (error) {
			throw error;
		}
	}

	async rejectFriend(friend_id: string) {
		await friendService.findFriendReqById(friend_id);
		await friendModel.deleteOne({ _id: friend_id });
	}
}

const friendService = new FriendService();

export default friendService;
