import Url from "../models/Url.js"

export const getShortenedUrl = async (req, res) => {
  const { originalUrl } = req.query

  try {
    const url = await Url.findOne({ originalUrl })

    if (url) {
      res.json({ shortUrl: url.shortUrl })
    } else {
      res.status(404).json({ error: "No shortened URL found for this original URL" })
    }
  } catch (error) {
    console.error("Error getting shortened URL:", error)
    res.status(500).json({ error: "Server error" })
  }
}

