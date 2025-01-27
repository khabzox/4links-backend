/**
 * @file server.ts
 * @description This file sets up and starts the Express server with clustering support.
 * It uses Clerk middleware for authentication and authorization, connects to MongoDB,
 * and sets up necessary middleware and routes.
 *
 * @module server
 *
 * @requires express
 * @requires cors
 * @requires dotenv
 * @requires ./lib/db.js
 * @requires ./routes/urlRoutes.js
 * @requires @clerk/express
 * @requires cluster
 * @requires os
 *
 * @function clerkMiddleware - Middleware to handle authentication and authorization for Clerk.com
 * @function connectDB - Function to connect to MongoDB
 *
 * @constant {express.Application} app - The Express application instance
 *
 * @constant {number} PORT - The port number on which the server listens (default: 5000)
 *
 * @description The server uses clustering to take advantage of multi-core systems by forking worker processes.
 * The master process forks a worker for each CPU core and restarts any worker that exits unexpectedly.
 * Each worker process runs an instance of the Express server.
 *
 * @see {@link https://clerk.com/docs/quickstarts/express Clerk Documentation}
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../lib/db.js";
import urlRoutes from "../routes/urlRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import cluster from "cluster";
import os from "os";

dotenv.config();

const app = express();

// Use Clerk middleware to handle authentication and authorization for Clerk.com
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
