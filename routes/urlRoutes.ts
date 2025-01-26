import express from "express"
import { createUrl } from "../controllers/createUrl.js"
import { readUrl } from "../controllers/readUrl.js"
import { updateUrl } from "../controllers/updateUrl.js"
import { deleteUrl } from "../controllers/deleteUrl.js"
import { getAllUrls } from "../controllers/getAllUrls.js"
import { getShortenedUrl } from "../controllers/getShortenedUrl.js"
import { redirectUrl } from "../controllers/redirectUrl.js"

const router = express.Router()

router.post("/shorten", createUrl)
router.get("/all", getAllUrls)
router.get("/get-short-url", getShortenedUrl)
router.get("/:shortUrl", readUrl)
router.put("/:shortUrl", updateUrl)
router.delete("/:shortUrl", deleteUrl)
router.get("/r/:shortUrl", redirectUrl)

export default router
