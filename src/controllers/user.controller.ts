import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userService from '../services/user.service';
import { createResponse, mappingResponse } from '../utils';

class UserController {
	constructor() {}

	async getUserInfo(req: Request, res: Response, next: NextFunction) {
		const data = req.user;
		return createResponse(res, StatusCodes.OK, data, next);
	}

	async findUserListByName(req: Request, res: Response, next: NextFunction) {
		const { full_name, page = 1, page_size = 10 } = req.query;
		if (!full_name) {
			return mappingResponse(res, StatusCodes.OK, []);
		}
		const users = await userService.findUserByFullName(
			full_name + '',
			Number(page),
			Number(page_size),
		);
		
		return createResponse(res, StatusCodes.OK, users, next);
	}

	async updateUser(req: Request, res: Response, next: NextFunction) {
		const { user, fileUrl, body } = req;
		const { full_name = '', dob = '' } = body;

		const userUpdated = await userService.updateUser(
			user._id,
			full_name,
			dob,
			fileUrl,
		);

		return createResponse(res, StatusCodes.CREATED, userUpdated, next);
	}
}

const userController = new UserController();
export default userController;
