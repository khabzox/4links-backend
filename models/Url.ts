/**
 * Interface representing a URL document in MongoDB.
 *
 * @interface IUrl
 * @extends {Document}
 *
 * @property {string} originalUrl - The original URL that needs to be shortened.
 * @property {string} shortUrl - The shortened version of the original URL.
 * @property {string} [password] - Optional password for accessing the shortened URL.
 * @property {Date} createdAt - The date when the URL was created.
 */

/**
 * Mongoose schema for the URL model.
 *
 * @const UrlSchema
 * @type {mongoose.Schema}
 *
 * @property {string} originalUrl - The original URL that needs to be shortened. This field is required.
 * @property {string} shortUrl - The shortened version of the original URL. This field is required and must be unique.
 * @property {string} [domain] - Optional domain for the shortened URL. Defaults to null.
 * @property {string} [password] - Optional password for accessing the shortened URL.
 * @property {Date} createdAt - The date when the URL was created. Defaults to the current date and time.
 */

/**
 * Mongoose model for the URL schema.
 *
 * @const Url
 * @type {mongoose.Model<IUrl>}
 */

import mongoose from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  password?: string;
  createdAt: Date;
}

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  domain: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model<IUrl>("Url", UrlSchema);

export default Url;
