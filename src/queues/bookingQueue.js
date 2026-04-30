import { Queue } from 'bullmq';
import { connection } from '../config/redis.js';

export const bookingQueue = new Queue('bookingQueue', {
  connection,
});