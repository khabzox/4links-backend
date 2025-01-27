/**
 * Express router for URL-related routes.
 *
 * This router handles the following routes:
 *
 * - POST /shorten: Create a new shortened URL.
 * - GET /all: Retrieve all URLs.
 * - GET /get-short-url: Retrieve a shortened URL.
 * - GET /:shortUrl: Read a specific URL by its shortened version.
 * - PUT /:shortUrl: Update a specific URL by its shortened version.
 * - DELETE /:shortUrl: Delete a specific URL by its shortened version.
 * - GET /r/:shortUrl: Redirect to the original URL using the shortened version.
 *
 * @module routes/urlRoutes
 * @requires express
 * @requires ../controllers/createUrl
 * @requires ../controllers/readUrl
 * @requires ../controllers/updateUrl
 * @requires ../controllers/deleteUrl
 * @requires ../controllers/getAllUrls
 * @requires ../controllers/getShortenedUrl
 * @requires ../controllers/redirectUrl
 */

import express from "express";
import { createUrl } from "../controllers/createUrl.js";
import { readUrl } from "../controllers/readUrl.js";
import { updateUrl } from "../controllers/updateUrl.js";
import { deleteUrl } from "../controllers/deleteUrl.js";
import { getAllUrls } from "../controllers/getAllUrls.js";
import { getShortenedUrl } from "../controllers/getShortenedUrl.js";
import { redirectUrl } from "../controllers/redirectUrl.js";

const router = express.Router();

router.post("/shorten", createUrl);
router.get("/all", getAllUrls);
router.get("/get-short-url", getShortenedUrl);
router.get("/:shortUrl", readUrl);
router.put("/:shortUrl", updateUrl);
router.delete("/:shortUrl", deleteUrl);
router.get("/r/:shortUrl", redirectUrl);

export default router;
