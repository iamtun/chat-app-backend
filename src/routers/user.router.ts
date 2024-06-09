import { Router } from 'express';
import userController from '../controllers/user.controller';
import { AuthMiddleware } from '../middlewares';

const router = Router();
router.get('/', AuthMiddleware, userController.getUser);
export default router;
