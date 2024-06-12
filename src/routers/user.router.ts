﻿import { Router } from 'express';
import userController from '../controllers/user.controller';
import { AuthMiddleware } from '../middlewares';
import { upload } from '../configs/upload';
import { UploadSingleFileMiddleware } from '../middlewares/upload.middleware';

const router = Router();
router.get('/', AuthMiddleware, userController.getUser);
router.patch(
	'/',
	AuthMiddleware,
	upload.single('avatar'),
	UploadSingleFileMiddleware,
	userController.updateUser,
);

export default router;
