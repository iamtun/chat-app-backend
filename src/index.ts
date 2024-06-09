import Express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { configDotenv } from 'dotenv';

import appRouter from './routers';
import Database from './configs/db';
import {
	UnhandledErrorMiddleware,
	RouteNotFoundErrorMiddleware,
} from './middlewares';

configDotenv();

const PORT = process.env.PORT;

Database.getInstance();
const app = Express();

app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use('/api/v1', appRouter);

app.use(RouteNotFoundErrorMiddleware);
app.use(UnhandledErrorMiddleware);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
