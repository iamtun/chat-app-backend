import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import conversationController from '../controllers/conversation.controller';

const router = Router();

router.get('/', AuthMiddleware, conversationController.getConversationList);
export default router;
