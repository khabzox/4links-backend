import Url from "../models/Url.js"

export const updateUrl = async (req, res) => {
  const { shortUrl } = req.params
  const { originalUrl, newShortUrl } = req.body

  try {
    const url = await Url.findOne({ shortUrl })

    if (!url) {
      return res.status(404).json({ error: "URL not found" })
    }

    if (newShortUrl && newShortUrl !== shortUrl) {
      const existingUrl = await Url.findOne({ shortUrl: newShortUrl })
      if (existingUrl) {
        return res.status(400).json({ error: "New short URL already in use" })
      }
      url.shortUrl = newShortUrl
    }

    if (originalUrl) {
      url.originalUrl = originalUrl
    }

    await url.save()
    res.json(url)
  } catch (error) {
    console.error("Error updating URL:", error)
    res.status(500).json({ error: "Server error" })
  }
}

