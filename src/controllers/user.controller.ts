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

		const userUpdated = await userService.updateUser(
			user._id,
			full_name,
			dob,
			fileUrl,
		);

		return mappingResponse(res, StatusCodes.OK, userUpdated);
	}
}

const userController = new UserController();
export default userController;
