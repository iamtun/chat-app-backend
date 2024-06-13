import redis from '../cache';
import userModel from '../models/user.model';
import { IUserCreated, IUserSaveInCache } from '../types/user';
import { TIME_EXPIRED_CACHE } from '../utils/constant';

class UserService {
	constructor() {}

	async findUserByFullName(
		fullName: string,
		page: number = 1,
		pageSize: number = 10,
	) {
		const users = await userModel
			.find({
				full_name: { $regex: fullName, $options: 'i' },
			})
			.skip((page - 1) * pageSize)
			.limit(pageSize);
		return users;
	}

	async updateUser(
		userId: string,
		fullName: string,
		dob: string,
		avatar: string,
	) {
		const user = await userModel.findById(userId);

		if (user) {
			if (fullName) {
				user.full_name = fullName;
			}
			if (avatar) {
				user.avatar = avatar;
			}
			if (dob) {
				user.dob = new Date(dob);
			}

			await user.save();

			await redis.setex(
				user.firebase_id,
				TIME_EXPIRED_CACHE,
				JSON.stringify(user),
			);

			return user;
		}
	}

	async findUserByFirebaseId(firebaseId: string) {
		return await userModel.findOne({ firebase_id: firebaseId });
	}

	async createUser(user: IUserCreated) {
		const userCreated = new userModel({
			...user,
		});

		await userCreated.save();
		await this.saveUserInCache(user.firebase_id, userCreated);
		return userCreated;
	}

	async saveUserInCache(firebaseUserId: string, user: any) {
		return await redis.setex(
			firebaseUserId,
			TIME_EXPIRED_CACHE,
			JSON.stringify(user),
		);
	}

	async findUserInCacheById(id: string) {
		return await redis.get(id);
	}
}

const userService = new UserService();
export default userService;
