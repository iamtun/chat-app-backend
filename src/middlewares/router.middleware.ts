import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const RouteNotFoundErrorMiddleware = (req: Request, res: Response) => {
	return res.status(StatusCodes.NOT_FOUND).json({
		error: 'Path not found',
		details: [{ message: `Path not found: ${req.originalUrl}` }],
		error_code: 'path_not_found',
	});
};

export default RouteNotFoundErrorMiddleware;
