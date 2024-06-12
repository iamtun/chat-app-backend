import userModel from '../models/user.model';

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
}

const userService = new UserService();
export default userService;
