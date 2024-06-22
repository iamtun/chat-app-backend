import { NextFunction, Request, Response } from 'express';
import messageService from '../services/message.service';
import { mappingResponse } from '../utils';
import { MessageNoContent } from '../errors';

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
		return mappingResponse(res, 201, message);
	}

	async getMessageListByConversationId(req: Request, res: Response) {
		const { conversationId } = req.params;
		const { page = 1, pageSize = 10 } = req.query;
		const messages = await messageService.getMessageListByConversationId(
			conversationId,
			+page,
			+pageSize,
		);
		return mappingResponse(res, 200, messages);
	}

	async getFileListByConversationId(req: Request, res: Response) {
		const { conversationId } = req.params;
		const { page = 1, pageSize = 10 } = req.query;
		const files = await messageService.getFileListByConversationId(
			conversationId,
			+page,
			+pageSize,
		);
		return mappingResponse(res, 200, files);
	}
}

const messageController = new MessageController();
export default messageController;
