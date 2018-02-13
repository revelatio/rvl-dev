const { auth } = require('./auth')
const { env } = require('./env')
// const { set } = require('./set')

module.exports = program => {
  auth(program)
  env(program)
  // set(program)
}
