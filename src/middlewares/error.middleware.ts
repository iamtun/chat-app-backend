﻿import StatusCodes from 'http-status-codes';

import {
	UserNotFoundError,
	NoTokenProvidedError,
	TokenExpiredError,
	TokenInvalidError,
	NoFileUploadedError,
	FriendExistedError,
	FriendReqNotFountError,
	MessageNoContent,
	ConversationIdInValid,
	NotFound,
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
	} else if (err instanceof FriendExistedError) {
		error_code = err.name || 'friend_existed';
		statusCode = StatusCodes.BAD_REQUEST;
		error = 'Friend existed';
		message = err.message || 'Friend existed';
	} else if (err instanceof FriendReqNotFountError) {
		error_code = err.name || 'friend_req_not_found';
		statusCode = StatusCodes.NOT_FOUND;
		error = 'Friend request not found';
		message = err.message || 'Friend request not found';
	} else if (err instanceof MessageNoContent) {
		error_code = err.name || 'message_no_content';
		statusCode = StatusCodes.BAD_REQUEST;
		error = 'Message no content';
		message = err.message || 'Message no content';
	} else if (err instanceof MessageNoContent) {
		error_code = err.name || 'message_no_content';
		statusCode = StatusCodes.BAD_REQUEST;
		error = 'Message no content';
		message = err.message || 'Message no content';
	} else if (err instanceof ConversationIdInValid) {
		error_code = err.name || 'invalid_conversation_id';
		statusCode = StatusCodes.BAD_REQUEST;
		error = 'Invalid conversation id';
		message = err.message || 'Invalid conversation id';
	} else if (err instanceof NotFound) {
		error_code = err.name || 'not_found';
		statusCode = StatusCodes.NOT_FOUND;
		error = 'Record not found';
		message = err.message || 'Record not found';
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
