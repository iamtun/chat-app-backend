import { NextFunction, Request, Response } from 'express';
import conversationService from '../services/conversation.service';
import { createResponse, mappingResponse } from '../utils';
import { StatusCodes } from 'http-status-codes';

class ConversationController {
	constructor() {}

	async getConversationList(req: Request, res: Response, next: NextFunction) {
		const { user } = req;
		const conversations = await conversationService.getConversationList(
			user._id,
		);

		return createResponse(res, StatusCodes.CREATED, conversations, next);
	}
}

const conversationController = new ConversationController();
export default conversationController;
