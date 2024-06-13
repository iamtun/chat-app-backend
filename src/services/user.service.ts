import redis from '../cache';
import userModel from '../models/user.model';
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
}

const userService = new UserService();
export default userService;
