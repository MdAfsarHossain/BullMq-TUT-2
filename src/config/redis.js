import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

export const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,

  // 👇 VERY IMPORTANT FIX
  maxRetriesPerRequest: null,
});