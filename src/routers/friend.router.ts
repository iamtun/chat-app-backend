import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import friendController from '../controllers/friend.controller';

const router = Router();

router.post('/', AuthMiddleware, friendController.createFriend);
router.get('/', AuthMiddleware, friendController.getFriendList);
router.post('/:id/status', AuthMiddleware, friendController.handleRequestFriend);

export default router;
