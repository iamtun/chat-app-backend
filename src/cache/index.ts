import { configDotenv } from 'dotenv';
import { Redis } from 'ioredis';

configDotenv();

const redis = new Redis({
	host: process.env.REDIS_HOST!,
	password: process.env.REDIS_PASSWORD!,
	port: Number(process.env.REDIS_PORT!),
});

export default redis;
