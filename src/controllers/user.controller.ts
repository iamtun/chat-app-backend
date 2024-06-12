import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import userService from '../services/user.service';
import { mappingResponse } from '../utils';

class UserController {
	constructor() {}

	async getUserInfo(req: Request, res: Response) {
		return mappingResponse(res, StatusCodes.OK, req.user);
	}

	async findUserListByName(req: Request, res: Response) {
		const { full_name, page = 1, page_size = 10 } = req.query;
		if (!full_name) {
			return mappingResponse(res, StatusCodes.OK, []);
		}
		const users = await userService.findUserByFullName(
			full_name + '',
			Number(page),
			Number(page_size),
		);
		return mappingResponse(res, StatusCodes.OK, users);
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
