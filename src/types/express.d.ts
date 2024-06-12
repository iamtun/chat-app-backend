// express.d.ts
import * as express from 'express';

declare global {
	namespace Express {
		interface Request {
			user?: any; // Adjust the type as needed
			fileUrls: Array<string>;
			fileUrl: string;
		}
	}
}
