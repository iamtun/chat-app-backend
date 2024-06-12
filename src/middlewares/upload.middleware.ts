import { NextFunction, Request, Response } from 'express';
import { convertLocationFileUploaded } from '../utils/upload';
import { NoFileUploadedError } from '../errors';

const UploadMultipleFileMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const files = req.files as globalThis.Express.Multer.File[];
	if (!req.files) {
		// next(new NoFileUploadedError('No files uploaded'));
		return next();
	}

	const fileUrls = files.map((file: any) =>
		convertLocationFileUploaded(file.location),
	);

	req.fileUrls = fileUrls;

	next();
};

const UploadSingleFileMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const file = req.file as any;
	if (!file) {
		// next(new NoFileUploadedError('No file uploaded'));
		return next();
	}

	const fileUrl = convertLocationFileUploaded(file.location);

	req.fileUrl = fileUrl;

	next();
};

export { UploadMultipleFileMiddleware, UploadSingleFileMiddleware };
