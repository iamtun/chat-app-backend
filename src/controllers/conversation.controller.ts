import { Request, Response } from 'express';
import conversationService from '../services/conversation.service';
import { mappingResponse } from '../utils';

class ConversationController {
	constructor() {}

	async getConversationList(req: Request, res: Response) {
		const { user } = req;
		const conversations = await conversationService.getConversationList(
			user._id,
		);
		return mappingResponse(res, 200, conversations);
	}
}

const conversationController = new ConversationController();
export default conversationController;
