import { Router } from 'express';
import { AuthMiddleware, ConversationMiddleware } from '../middlewares';
import { upload } from '../configs/upload';
import { UploadMultipleFileMiddleware } from '../middlewares/upload.middleware';
import messageController from '../controllers/message.controller';

const router = Router();

router.post(
	'/',
	AuthMiddleware,
	upload.array('files', 10),
	UploadMultipleFileMiddleware,
	messageController.createMessage,
);

router.get(
	'/conversation/:conversationId',
	AuthMiddleware,
	ConversationMiddleware.validateConversationId,
	messageController.getMessageListByConversationId,
);

router.get(
	'/conversation/:conversationId/files',
	AuthMiddleware,
	ConversationMiddleware.validateConversationId,
	messageController.getFileListByConversationId,
);

export default router;
