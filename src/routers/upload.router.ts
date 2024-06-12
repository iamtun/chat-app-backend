import { StatusCodes } from 'http-status-codes';
import Express from 'express';

import { upload } from '../configs/upload';
import { UploadMultipleFileMiddleware, UploadSingleFileMiddleware } from '../middlewares/upload.middleware';

const router = Express.Router();

router.post(
	'/',
	upload.array('files'),
	UploadMultipleFileMiddleware,
	(req, res) => {
		return res.status(StatusCodes.OK).json({
			files: req.file,
		});
	},
);

export default router;
