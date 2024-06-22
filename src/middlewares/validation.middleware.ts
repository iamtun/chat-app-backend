import { Schema, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export default (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue) => ({
					message: `${issue.path.join('.')} is ${issue.message}`,
				}));
				res.status(StatusCodes.BAD_REQUEST).json({
					error_code: 'validation_error',
					error: 'Invalid data',
					details: errorMessages,
				});
			} else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error_code: 'validation_error',
					error: 'Internal Server Error',
					details: [],
				});
			}
		}
	};
};
