import { StatusCodes } from 'http-status-codes';
import Express from 'express';

import multer from 'multer';
import S3Storage from '../configs/storage';
import { convertLocationFileUploaded } from '../utils/upload';

const upload = multer({ storage: S3Storage, limits: { fileSize: 1024 * 50 } });

const router = Express.Router();

router.post('/', upload.array('files'), (req, res) => {
	const files = req.files as globalThis.Express.Multer.File[];
	if (!files || files.length === 0) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: 'No files uploaded' });
	}
	return res.status(StatusCodes.OK).json({
		files: files.map((file: any) => ({
			...file,
			location: convertLocationFileUploaded(file.location),
		})),
	});
});

export default router;
