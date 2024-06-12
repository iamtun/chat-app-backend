import StatusCodes from 'http-status-codes';

import {
	UserNotFoundError,
	NoTokenProvidedError,
	TokenExpiredError,
	TokenInvalidError,
	NoFileUploadedError,
} from '../errors';
import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';

const config = {
	environment: process.env.NODE_ENV || 'development',
};

const UnhandledErrorMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
	let error = 'Server error';
	let message = 'An error has occured, please try again later.';
	let error_code = 'no_code';

	if (err instanceof UserNotFoundError) {
		statusCode = StatusCodes.NOT_FOUND;
		error = 'Resource not found error';
		message = err.message || 'User not found.';
	} else if (err instanceof NoTokenProvidedError) {
		error_code = err.name;
		statusCode = StatusCodes.BAD_REQUEST;
		error = 'Token no provided';
		message = err.message || 'Token no provided';
	} else if (err instanceof TokenExpiredError) {
		error_code = err.name;
		statusCode = StatusCodes.UNAUTHORIZED;
		error = 'Token expired';
		message = err.message || 'Token expired';
	} else if (err instanceof TokenInvalidError) {
		error_code = err.name;
		statusCode = StatusCodes.BAD_REQUEST;
		error = 'Token invalid';
		message = err.message || 'Token invalid';
	} else if (err instanceof MulterError) {
		error_code = 'multer_error';
		statusCode = StatusCodes.BAD_REQUEST;
		error = 'File upload error';
		message = err.message || 'File upload error';
	} else if (err instanceof NoFileUploadedError) {
		error_code = err.name || 'no_file_uploaded';
		statusCode = StatusCodes.BAD_REQUEST;
		error = 'File upload error';
		message = err.message || 'File upload error';
	}

	const errorResponse = {
		error_code,
		error,
		details: [{ message }],
		detailed: config.environment === 'development' ? err.message : undefined,
		stack: config.environment === 'development' ? err.stack : undefined,
	};

	return res.status(statusCode).json(errorResponse);
};
export default UnhandledErrorMiddleware;
