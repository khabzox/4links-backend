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
