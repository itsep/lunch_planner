const multer = require('multer')
const uuidv4 = require('uuid/v4')
const { InputValidationError } = require('../../shared/lib/error')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/')
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}.png`)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new InputValidationError(
      'file', 'uploaded file is neither jpeg nor png',
      'invalidFileFormat',
    ), false)
  }
}

const upload = multer({
  storage,
  limits: { filesize: 1024 * 1024 * 5 },
  fileFilter,
})

module.exports = {
  upload,
}
