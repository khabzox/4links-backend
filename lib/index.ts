/**
 * @fileoverview This module exports various functions and middleware for the 4links-backend application.
 * 
 * @module lib/index
 * 
 * @exports connectDB - The default export from the db module, responsible for establishing a database connection.
 * @exports setupMiddleware - Function to set up middleware from the middleware module.
 * @exports createUrl - Function to create a new URL from the createUrl controller.
 * @exports readUrl - Function to read an existing URL from the readUrl controller.
 * @exports updateUrl - Function to update an existing URL from the updateUrl controller.
 * @exports deleteUrl - Function to delete an existing URL from the deleteUrl controller.
 * @exports getAllUrls - Function to retrieve all URLs from the getAllUrls controller.
 * @exports getShortenedUrl - Function to get a shortened URL from the getShortenedUrl controller.
 * @exports redirectUrl - Function to handle URL redirection from the redirectUrl controller.
 */

export { default as connectDB } from "./db.js";
export { setupMiddleware } from "./middleware.js";
export { createUrl } from "../controllers/createUrl.js";
export { readUrl } from "../controllers/readUrl.js";
export { updateUrl } from "../controllers/updateUrl.js";
export { deleteUrl } from "../controllers/deleteUrl.js";
export { getAllUrls } from "../controllers/getAllUrls.js";
export { getShortenedUrl } from "../controllers/getShortenedUrl.js";
export { redirectUrl } from "../controllers/redirectUrl.js";