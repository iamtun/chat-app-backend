import conversationModel from '../models/conversation.model';

class ConversationService {
	constructor() {}

	async getConversationList(
		userId: string,
		page: number = 1,
		pageSize: number = 10,
	) {
		return await conversationModel
			.find({ members: userId })
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.populate('members', {
				full_name: 1,
				avatar: 1,
			})
			.populate('last_message');
	}

	async getConversationById(conversationId: string) {
		return await conversationModel.findById(conversationId);
	}
}

const conversationService = new ConversationService();
export default conversationService;
