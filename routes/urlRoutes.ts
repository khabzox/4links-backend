import express from "express";
import { createUrl } from "../controllers/createUrl";
import { readUrl } from "../controllers/readUrl";
import { updateUrl } from "../controllers/updateUrl";
import { deleteUrl } from "../controllers/deleteUrl";
import { getAllUrls } from "../controllers/getAllUrls";
import { getShortenedUrl } from "../controllers/getShortenedUrl";
import { redirectUrl } from "../controllers/redirectUrl";

const router = express.Router();

router.post("/shorten", createUrl);
router.get("/all", getAllUrls);
router.get("/get-short-url", getShortenedUrl);
router.get("/:shortUrl", readUrl);
router.put("/:shortUrl", updateUrl);
router.delete("/:shortUrl", deleteUrl);
router.get("/r/:shortUrl", redirectUrl);

export default router;
