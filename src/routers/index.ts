import { Router } from 'express';
import userRouter from './user.router';
import friendRouter from './friend.router';
import uploadRouter from './upload.router';
const appRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/friends', friendRouter);
appRouter.use('/upload', uploadRouter);

export default appRouter;
