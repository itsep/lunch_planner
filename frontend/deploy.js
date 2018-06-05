const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const deployDestination = '/var/www/lunchspace.de'
const deploySource = path.resolve('./dist')
const deployLastVersion = `${deployDestination}-tmp-last-version`


// check new deploy source exists
if (!fs.existsSync(deploySource)) {
  console.error('deploy source', deploySource, 'does not exists')
  process.exit(1)
}

// check current deploy source exists and rename it
if (fs.existsSync(deployDestination)) {
  fs.renameSync(deployDestination, deployLastVersion)
} else {
  // make all directories in front of the deploy destination directory
  // this is required for a rename to succeed
  mkdirp.sync(path.join(deployDestination, '..'))
}

// deploy new version
try {
  fs.renameSync(deploySource, deployDestination)
} catch (error) {
  console.error(error)
  // fallback to previous version
  fs.renameSync(deployLastVersion, deployDestination)
  console.error('deploy failed')
  process.exit(1)
}
