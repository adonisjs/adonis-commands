'use strict'

/**
 * adonis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const BaseGenerator = require('./Base')
const path = require('path')

class KeyGenerator extends BaseGenerator {

  get signature () {
    return 'key:generate {-f,--force?} {-e,--env=@value} {-s,--size=@value} {--echo?}'
  }

  get description () {
    return 'Generate encryption key for your application'
  }

  setup () {
    this.randomString = require('randomstring')
    this.dotEnv = require('dotenv')
  }

  * handle (args, options) {
    if (process.env.NODE_ENV === 'production' && !options.force) {
      this.error('Cannot generate key in production, use --force to force generate a key')
      return
    }
    const env = options.env || '.env'
    let envContents = ''
    const size = options.size || 32
    const pathToEnv = path.isAbsolute(env) ? env : path.join(this.helpers.basePath(), env)
    let parsedValues = yield this._getContents(pathToEnv)
    const key = this.randomString.generate(size)

    if (options.echo) {
      return this.success(`APP_KEY=${key}`)
    }
    parsedValues = this.dotEnv.parse(parsedValues)
    parsedValues.APP_KEY = key
    Object.keys(parsedValues).forEach(function (item) {
      envContents += `${item}=${parsedValues[item]}\n`
    })
    yield this._writeContents(pathToEnv, envContents)
    this.success('Generated app key')
  }

}

module.exports = KeyGenerator
