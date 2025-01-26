import { Request, Response } from "express";
import Url from "../models/Url";

export const deleteUrl = async (req: Request, res: Response): Promise<void> => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOneAndDelete({ shortUrl });
    if (url) {
      res.json({ message: "URL deleted" });
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};
