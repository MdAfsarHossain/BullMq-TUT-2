# 🚀 📁 Project Structure

```js
bullmq-express-app/
├── src/
│   ├── config/
│   │   └── redis.js
│   ├── queues/
│   │   └── bookingQueue.js
│   ├── workers/
│   │   └── bookingWorker.js
│   ├── controllers/
│   │   └── bookingController.js
│   ├── routes/
│   │   └── bookingRoutes.js
│   ├── app.js
│   └── server.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env
├── package.json
```

# 📦 1. Install Dependencies

```js
npm init -y
npm install express bullmq ioredis dotenv
npm install nodemon --save-dev
```

# 2. .env File

```js
PORT=5000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

# 🔌 3. Redis Config

📁 `src/config/redis.js`

```js
import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
```

# 📬 4. Queue Setup

📁 `src/queues/bookingQueue.js`

```js
import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

export const bookingQueue = new Queue("bookingQueue", {
  connection,
});
```

# 🧠 5. Worker (Background Processing)

📁 `src/workers/bookingWorker.js`

```js
import { Worker } from "bullmq";
import { connection } from "../config/redis.js";

const worker = new Worker(
  "bookingQueue",
  async (job) => {
    console.log("Processing Job:", job.name);

    const data = job.data;

    // Simulate tasks
    console.log("💳 Processing Payment...");
    await new Promise((res) => setTimeout(res, 2000));

    console.log("📩 Sending Email...");
    await new Promise((res) => setTimeout(res, 1000));

    console.log("📱 Sending SMS...");
    await new Promise((res) => setTimeout(res, 1000));

    console.log("✅ Job Completed:", data);
  },
  { connection },
);

// Events
worker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

export default worker;
```

# 🎯 6. Controller

📁 `src/controllers/bookingController.js`

```js
import { bookingQueue } from "../queues/bookingQueue.js";

export const createBooking = async (req, res) => {
  try {
    const data = req.body;

    await bookingQueue.add("bookTicket", data, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    });

    res.json({
      success: true,
      message: "Booking job added to queue 🚀",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

# 🛣️ 7. Routes

📁 `src/routes/bookingRoutes.js`

```js
import express from "express";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/book", createBooking);

export default router;
```

# 🌐 8. App Setup

📁 `src/app.js`

```js
import express from "express";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", bookingRoutes);

export default app;
```

# 🚀 9. Server

📁 `src/server.js`

```js
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

# ▶️ 10. Run Project

## Run Server

```js
npm run dev
```

👉 package.json script add করো:

```js
"scripts": {
  "dev": "nodemon src/server.js",
  "worker": "node src/workers/bookingWorker.js"
}
```

## Run Worker (separate terminal)

```js
npm run worker
```

# 🧪 Test API

```js
POST http://localhost:5000/api/book
```

```js
{
  "name": "Afsar",
  "email": "test@mail.com",
  "phone": "017xxxxxxxx"
}
```
