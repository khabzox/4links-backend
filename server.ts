import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import cluster from "cluster";
import os from "os";

dotenv.config();

const app = express();

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

  app.use("/api", urlRoutes);

  app.listen(PORT, () => {
    console.log(
      `Worker process is running on PID: ${process.pid}, Server running on port ${PORT}`
    );
  });
}