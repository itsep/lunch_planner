function makeId(length) {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let i

  for (i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

module.exports = {
  makeId,
}
