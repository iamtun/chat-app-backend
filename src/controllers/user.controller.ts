import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

class UserController {
	constructor() {}

	async getUser(req: Request, res: Response) {
		return res.status(200).json({ user: req.user });
	}

	async updateUser(req: Request, res: Response) {
		const { user, fileUrl, body } = req;
		const { full_name = '', dob = '' } = body;

		if (full_name) {
			user.full_name = full_name;
		}
		if (fileUrl) {
			user.avatar = fileUrl;
		}
		if (dob) {
			user.dob = new Date(dob);
		}

		await user.save();

		return res.status(StatusCodes.CREATED).json({ user });
	}
}

const userController = new UserController();
export default userController;
