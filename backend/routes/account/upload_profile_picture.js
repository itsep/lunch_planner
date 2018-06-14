const formidable = require('formidable')
const path = require('path')
const { pool } = require('../../lib/database')
const uuidv4 = require('uuid/v4')
const config = require('config')

async function saveURL(userId, url) {
  await pool.execute('UPDATE user SET image_url = ? WHERE id = ?', [url, userId])
}

async function uploadProfilePicture(req, res) {
  const form = new formidable.IncomingForm()
  const { userId } = req.token
  const picturePath = config.get('picturePath')
  let url

  form.maxFileSize = 2 * 1024 * 1024
  form.parse(req)

  form.on('fileBegin', (name, file) => {
    url = `${picturePath}${uuidv4()}.png`
    // eslint-disable-next-line no-param-reassign
    file.path = url
  })

  await saveURL(userId, url)

  return res.json(200, {
    result: 'Upload Success',
  })
}

module.exports = {
  uploadProfilePicture,
}
