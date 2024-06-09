import { Response, Request } from 'express';

class UserController {
	constructor() {}

	async getUser(req: Request, res: Response) {
		return res.status(200).json({ user: req.user });
	}
}

const userController = new UserController();
export default userController;
