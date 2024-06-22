import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import conversationService from '../services/conversation.service';
import { ConversationIdInValid, NotFound } from '../errors';

const ConversationMiddleware = {
	validateConversationId: async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { conversationId } = req.params;
		if (!conversationId) {
			return next(new ConversationIdInValid('Invalid conversation id'));
		}

		const conversation = await conversationService.getConversationById(
			conversationId,
		);

		if (!conversation) {
			return next(new NotFound('Conversation not found'));
		}
		next();
	},
};

export default ConversationMiddleware;
