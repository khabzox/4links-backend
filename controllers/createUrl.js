import Url from "../models/Url.js"
import shortid from "shortid"

export const createUrl = async (req, res) => {
  const { originalUrl, customShortUrl } = req.body

  try {
    let url = await Url.findOne({ originalUrl })

    if (url) {
      res.json(url)
    } else {
      const shortUrl = customShortUrl || shortid.generate()
      
      if (customShortUrl) {
        const existingCustomUrl = await Url.findOne({ shortUrl: customShortUrl })
        if (existingCustomUrl) {
          return res.status(400).json({ error: "Custom short URL already in use" })
        }
      }

      url = new Url({
        originalUrl,
        shortUrl,
      })

      await url.save()
      res.status(201).json(url)
    }
  } catch (error) {
    console.error("Error creating short URL:", error)
    res.status(500).json({ error: "Server error" })
  }
}
