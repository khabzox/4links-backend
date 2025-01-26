"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrl = void 0;
const Url_1 = __importDefault(require("../models/Url"));
const shortid_1 = __importDefault(require("shortid"));
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalUrl } = req.body;
    const shortUrl = shortid_1.default.generate();
    try {
        const url = new Url_1.default({ originalUrl, shortUrl });
        yield url.save();
        res.status(201).json(url);
    }
    catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.createUrl = createUrl;
