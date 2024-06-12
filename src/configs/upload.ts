import multer from 'multer';
import S3Storage from './storage';
import { MAX_SIZE_FILE_UPLOAD } from '../utils/constant';

export const upload = multer({
	storage: S3Storage,
	limits: { fileSize: MAX_SIZE_FILE_UPLOAD },
});
