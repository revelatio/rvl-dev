const os = require('os')
const path = require('path')
const fs = require('fs')
const Promise = require('bluebird')
const axios = require('axios')

const fsReadFile = Promise.promisify(fs.readFile)
const fsWriteFile = Promise.promisify(fs.writeFile)

function createDotEnv (props) {
  return Object.keys(props)
    .reduce((prev, key) => prev.concat([`${key}=${props[key]}`]), [])
    .join('\n')
}

function getEnv () {
  const folder = path.join(os.homedir(), '.rvl')
  const dotEnv = path.join(process.cwd(), '.env')
  const authFile = path.join(folder, 'auth')
  const pkgFile = path.join(process.cwd(), 'package.json')

  return Promise.all([
    fsReadFile(authFile, 'utf8'),
    fsReadFile(pkgFile, 'utf8')
  ])
    .then(([token, pkgStr]) => {
      const pkg = JSON.parse(pkgStr)

      return axios({
        url: `http://www.revelat.io/api/rvl-dev/env/${pkg.name}`,
        method: 'GET',
        headers: { token: token }
      })
    })
    .then(response => fsWriteFile(dotEnv, createDotEnv(response.data.vars)))
    .then(() => {
      console.log('Created .env')
    })
    .catch(err => {
      console.log(`Failed to get env vars: ${err.response.data}`)
    })
}

module.exports = {
  env: program => {
    program
      .command('env')
      .description('Retrieves development environment variables and stores them in .env file. It uses local package.json file to get repo/project.')
      .action(getEnv)
  }
}
