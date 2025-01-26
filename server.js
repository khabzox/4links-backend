"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./lib/db.js"));
const urlRoutes_js_1 = __importDefault(require("./routes/urlRoutes.js"));
const express_2 = require("@clerk/express");
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/*
  Use Clerk middleware to handle authentication and authorization for Clerk.com
  visit https://clerk.com/docs/quickstarts/express for more information
*/
app.use((0, express_2.clerkMiddleware)());
// Connect to MongoDB
(0, db_js_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Check if the current process is the master process
if (cluster_1.default.isMaster) {
    const numCPUs = os_1.default.cpus().length;
    console.log(`Master process is running on PID: ${process.pid}`);
    // Fork workers (one for each CPU core)
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    // Listen for worker exit events
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster_1.default.fork(); // Restart a new worker
    });
}
else {
    // Worker processes
    const PORT = process.env.PORT || 5000;
    app.use("/api", urlRoutes_js_1.default);
    app.listen(PORT, () => {
        console.log(`Worker process is running on PID: ${process.pid}, Server running on port ${PORT}`);
    });
}
