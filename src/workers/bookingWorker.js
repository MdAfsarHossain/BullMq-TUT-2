import { Worker } from 'bullmq';
import { connection } from '../config/redis.js';

const worker = new Worker(
  'bookingQueue',
  async (job) => {
    console.log('Processing Job:', job.name);

    const data = job.data;

    // Simulate tasks
    console.log('💳 Processing Payment...');
    await new Promise((res) => setTimeout(res, 2000));

    console.log('📩 Sending Email...');
    await new Promise((res) => setTimeout(res, 1000));

    console.log('📱 Sending SMS...');
    await new Promise((res) => setTimeout(res, 1000));

    console.log('✅ Job Completed:', data);
  },
  { connection }
);

// Events
worker.on('completed', (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

export default worker;