"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UrlSchema = new mongoose_1.default.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Url = mongoose_1.default.model("Url", UrlSchema);
exports.default = Url;
