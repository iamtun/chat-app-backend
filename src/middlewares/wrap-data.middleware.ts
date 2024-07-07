import { NextFunction, Request, Response } from 'express';
import { mappingResponse } from '../utils';

const WrapperDataMiddleware = (_: Request, res: Response, __: NextFunction) => {
	const data = res.locals.data;
	const statusCode = res.locals.statusCode;

	return mappingResponse(res, statusCode, data);
};

export default WrapperDataMiddleware;
