import express from 'express';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/v1', bookingRoutes);

export default app;