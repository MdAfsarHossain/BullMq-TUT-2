import { bookingQueue } from '../queues/bookingQueue.js';

export const createBooking = async (req, res) => {
  try {
    const data = req.body;

    await bookingQueue.add('bookTicket', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });

    res.json({
      success: true,
      message: 'Booking job added to queue 🚀',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};