const { pool } = require('../../lib/database')
const fs = require('fs-nextra')
const sharp = require('sharp')
const uuidv4 = require('uuid/v4')
const { lunchspaceChannel } = require('../../lib/lunchspace_channels')

async function saveURL(userId, url) {
  await pool.execute('UPDATE user SET image_url = ? WHERE id = ?', [url, userId])
}

async function getLunchspaceIdsForUser(userId) {
  pool.execute('')
}

function getPathFromUrl(url) {
  let path
  if (typeof url === 'string') {
    const parts = url.split('/')
    path = `./${parts[2]}/${parts[3]}`
  }
  return path
}

async function uploadProfilePicture(req, res) {
  const { userId } = req.token
  const user = await req.userPromise
  const name = uuidv4()
  const path = `./images/${name}.png`
  const url = `/api/images/${name}.png`

  const oldPath = getPathFromUrl(user.imageUrl)

  sharp.cache(false)
  await sharp(req.file.path).resize(256, 256).toFile(path)

  await saveURL(userId, url)

  await fs.unlink(req.file.path)
  if (await fs.exists(oldPath)) {
    await fs.unlink(oldPath)
  }
  getLunchspacesForUser(userId).then((lunchspaces) => {
    lunchspaces.forEach((lunchspace) => {
      req.publishClient.publish(lunchspaceChannel(lunchspace.id), { action: 'updateUser', user })
    })
  })
  return res.status(200).json({})
}

module.exports = {
  uploadProfilePicture,
}
