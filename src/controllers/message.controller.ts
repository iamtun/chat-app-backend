import { NextFunction, Request, Response } from 'express';
import messageService from '../services/message.service';
import { createResponse } from '../utils';
import { MessageNoContent } from '../errors';
import { StatusCodes } from 'http-status-codes';

class MessageController {
	constructor() {}

	async createMessage(req: Request, res: Response, next: NextFunction) {
		const { user, fileUrls } = req;
		const { content, conversation_id } = req.body;

		if (!content && !fileUrls) {
			return next(new MessageNoContent(`Message hasn't content`));
		}

		const message = await messageService.createMessage(
			content,
			user._id,
			conversation_id,
			fileUrls,
		);
		return createResponse(res, StatusCodes.CREATED, message, next);
	}

	async getMessageListByConversationId(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const { conversationId } = req.params;
		const { page = 1, pageSize = 10 } = req.query;
		const messages = await messageService.getMessageListByConversationId(
			conversationId,
			+page,
			+pageSize,
		);

		return createResponse(res, StatusCodes.OK, messages, next);
	}

	async getFileListByConversationId(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const { conversationId } = req.params;
		const { page = 1, pageSize = 10 } = req.query;
		const files = await messageService.getFileListByConversationId(
			conversationId,
			+page,
			+pageSize,
		);
		return createResponse(res, StatusCodes.OK, files, next);
	}
}

const messageController = new MessageController();
export default messageController;
