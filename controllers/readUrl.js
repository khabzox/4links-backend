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
exports.readUrl = void 0;
const Url_js_1 = __importDefault(require("../models/Url.js"));
const readUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortUrl } = req.params;
    try {
        const url = yield Url_js_1.default.findOne({ shortUrl });
        if (url) {
            res.json(url);
        }
        else {
            res.status(404).json({ error: "URL not found" });
        }
    }
    catch (error) {
        console.error("Error reading URL:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.readUrl = readUrl;
