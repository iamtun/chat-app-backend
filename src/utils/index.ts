import { Response } from 'express';

const mappingResponse = (res: Response, statusCode: number, data: any) => {
	return res.status(statusCode).json({ data });
};

export { mappingResponse };
