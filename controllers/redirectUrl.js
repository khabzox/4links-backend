import Url from "../models/Url.js"

export const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl })

    if (url) {
      return res.redirect(url.originalUrl)
    } else {
      return res.status(404).json({ error: "No URL found" })
    }
  } catch (error) {
    console.error("Error redirecting to URL:", error)
    res.status(500).json({ error: "Server error" })
  }
}

