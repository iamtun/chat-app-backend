import { Router } from 'express';
import userRouter from './user.router';

import uploadRouter from './upload.router';
const appRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/upload', uploadRouter);

export default appRouter;
