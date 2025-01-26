"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddleware = void 0;
const express_1 = require("@clerk/express");
const cors_1 = __importDefault(require("cors"));
const express_2 = __importDefault(require("express"));
const setupMiddleware = (app) => {
    app.use((0, express_1.clerkMiddleware)());
    app.use((0, cors_1.default)());
    app.use(express_2.default.json());
};
exports.setupMiddleware = setupMiddleware;
