import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import cluster from "cluster";
import os from "os";
import redis from "redis";

dotenv.config();

const app = express();

// Redis client setup
const client = redis.createClient();
client.on("error", (err) => {
  console.error("Redis error:", err);
});

/*
  Use Clerk middleware to handle authentication and authorization for Clerk.com
  visit https://clerk.com/docs/quickstarts/express for more information
*/
app.use(clerkMiddleware());

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Cache middleware
const cache = (req, res, next) => {
  const { id } = req.params;

  client.get(id, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(JSON.parse(data)); // Serve cached data
    } else {
      next(); // Proceed to the next middleware
    }
  });
};

// Check if the current process is the master process
if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process is running on PID: ${process.pid}`);

  // Fork workers (one for each CPU core)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exit events
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // Restart a new worker
  });
} else {
  // Worker processes
  const PORT = process.env.PORT || 5000;

  // Apply cache middleware to specific routes
  app.use("/api/links/:id", cache, (req, res) => {
    // Simulate fetching data from a database
    const data = { id: req.params.id, value: "Some data" };

    // Save data to Redis
    client.setex(req.params.id, 3600, JSON.stringify(data));

    res.json(data);
  });

  app.use("/api", urlRoutes);

  app.listen(PORT, () => {
    console.log(
      `Worker process is running on PID: ${process.pid}, Server running on port ${PORT}`
    );
  });
}
