import { Router } from 'express';
import userRouter from './user.router';
import friendRouter from './friend.router';
import uploadRouter from './upload.router';
import conversationRouter from './conversation.router';
import messageRouter from './message.router';

const appRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/friends', friendRouter);
appRouter.use('/conversations', conversationRouter);
appRouter.use('/upload', uploadRouter);
appRouter.use('/messages', messageRouter);

export default appRouter;
