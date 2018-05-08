function validLength(param, maximumLength, minimumLength) {
  let paramCut = param
  if (typeof param === 'string') {
    paramCut = param.trim()
  } else {
    return false
  }
  if (paramCut.length > maximumLength) {
    return false
  }
  if (paramCut.length < minimumLength) {
    return false
  }
  return true
}
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
function validEmail(email) {
  return (validLength(email, 120, 5) && re.test(email))
}

module.exports = {
  validLength,
  validEmail,
}
