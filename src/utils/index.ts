import { NextFunction, Response } from 'express';

const mappingResponse = (res: Response, statusCode: number, data: any) => {
	return res.status(statusCode).json({ data });
};

const createResponse = (
	res: Response,
	statusCode: number,
	data: any,
	next: NextFunction,
) => {
	res.locals = { data, statusCode };
	return next();
};

const getFileType = (fileName: string) => {
	const extension = fileName?.split('.')?.pop()?.toLowerCase();

	if (!extension) {
		return 'unknown';
	}

	const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'];
	const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'];
	const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'];

	if (imageExtensions.includes(extension)) {
		return 'image';
	} else if (videoExtensions.includes(extension)) {
		return 'video';
	} else if (documentExtensions.includes(extension)) {
		return 'docs';
	} else {
		return 'unknown';
	}
};

export { mappingResponse, getFileType, createResponse };
