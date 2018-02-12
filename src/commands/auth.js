const os = require('os')
const path = require('path')
const fs = require('fs')
const Promise = require('bluebird')
const mkdirp = require('mkdirp')

const mkdir = Promise.promisify(mkdirp)
const fsWriteFile = Promise.promisify(fs.writeFile)

function storeAuth (token) {
  const folder = path.join(os.homedir(), '.rvl')
  return mkdir(folder)
    .then(() => fsWriteFile(path.join(folder, 'auth'), token))
    .then(() => {
      console.log('Done')
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  auth: program => {
    program
      .command('auth <token>')
      .description('Stores Revelat.io auth token needed for most CLI operations')
      .action(storeAuth)
  }
}
