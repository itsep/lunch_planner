const formidable = require('formidable')
const path = require('path')
const { pool } = require('../../lib/database')

async function saveURL (userId, url) {
  await pool.execute('UPDATE user SET image_url = ? WHERE id = ?', [url, userId])
}

async function uploadProfilePicture(req, res) {
  const form = new formidable.IncomingForm()
  const { userId } = req.token

  form.maxFileSize = 5 * 1024 * 1024
  form.parse(req)

  form.on('fileBegin', (name, file) => {
    file.path = __dirname + '/data/' + file.name
  })

  return res.json(200, {
    result: 'Upload Success',
  })
}

module.exports = {
  uploadProfilePicture,
}
