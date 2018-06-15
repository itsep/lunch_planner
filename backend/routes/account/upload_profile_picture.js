const { pool } = require('../../lib/database')
const config = require('config')
const fs = require('fs-nextra')
const sharp = require('sharp')
const uuidv4 = require('uuid/v4')

async function saveURL(userId, url) {
  await pool.execute('UPDATE user SET image_url = ? WHERE id = ?', [url, userId])
}

async function uploadProfilePicture(req, res) {
  const { userId } = req.token
  const { imageUrl } = await req.userPromise
  const url = `./uploads/${uuidv4()}.png`
  await sharp(req.file.path).resize(256, 256).toFile(url)
  await saveURL(userId, url)
  await fs.unlink(req.file.path)
  if (fs.exists(imageUrl)) {
    await fs.unlink(imageUrl)
  }
  return res.status(200).json({})
}

module.exports = {
  uploadProfilePicture,
}
