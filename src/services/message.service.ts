import fileModel from '../models/file.model';
import messageModel from '../models/message.model';
import { getFileType } from '../utils';

class MessageService {
	constructor() {}

	async createMessage(
		content: string | null,
		senderId: string,
		conversationId: string,
		files: Array<string> | null = null,
	) {
		const messageData: { [key: string]: any } = {
			sender: senderId,
			conversation_id: conversationId,
		};

		if (content) {
			messageData.content = content;
		}

		if (Array.isArray(files) && files.length > 0) {
			const fileListCreated = files.map((fileUrl) => {
				const fileName = fileUrl.split('/').pop();
				return fileModel.create({
					conversation_id: conversationId,
					type: fileName ? getFileType(fileName) : 'unknown',
					url: fileUrl,
				});
			});

			const _files = await Promise.all(fileListCreated);
			messageData.files = _files.map((file) => file._id + '');
		}

		const message = await messageModel.create(messageData);
		return message.populate('files', { url: 1, type: 1 });
	}

	async getMessageListByConversationId(
		conversationId: string,
		page: number = 1,
		pageSize: number = 10,
	) {
		return await messageModel
			.find({ conversation_id: conversationId })
			.sort({ created_at: -1, updated_at: -1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.populate('sender', { full_name: 1, avatar: 1 })
			.populate('files', { url: 1, type: 1 });
	}

	async getFileListByConversationId(
		conversationId: string,
		page: number = 1,
		pageSize: number = 10,
	) {
		return await fileModel
			.find({ conversation_id: conversationId }, { url: 1, type: 1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize);
	}
}

const messageService = new MessageService();
export default messageService;
