'use strict'

/**
 * adonis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const path = require('path')
const hogan = require('hogan.js')
const i = require('inflect')
const Ioc = require('adonis-fold').Ioc
const Command = Ioc.use('Adonis/Src/Command')
const fs = require('co-fs-extra')

class Base extends Command {

  constructor (Helpers) {
    super()
    this.helpers = Helpers
  }

  /**
   * makes path to a given template
   * @param  {String} template
   * @return {String}
   *
   * @private
   */
  _makeTemplatePath (template) {
    return path.join(__dirname, '../../templates', `${template}.mustache`)
  }

  /**
   * makes entity name to be used as the file name
   * @param  {String} name
   * @param  {String} entity
   * @param  {Boolean} needPrefix
   * @param  {String} [noun]
   * @return {String}
   *
   * @private
   */
  _makeEntityName (name, entity, needPrefix, noun) {
    const method = `${noun}ize`
    const regExp = new RegExp(`-?_?${entity}`, 'g')
    name = i.underscore(name).replace(regExp, '')
    name = i[method] ? i[method](name) : name
    return needPrefix ? i.camelize(`${name}_${entity}`) : i.camelize(name)
  }

  /**
   * returns contents for a given template
   * @param  {String} template
   * @return {String}
   *
   * @private
   */
  * _getContents (template) {
    return yield fs.readFile(template, 'utf-8')
  }

  /**
   * tells whether a template exists or not
   * @param  {String}  dest
   * @return {Boolean}
   *
   * @private
   */
  * _hasFile (dest) {
    return yield fs.exists(dest)
  }

  /**
   * writes contents to a given destination
   * @param  {String} dest
   * @param  {String} contents
   * @return {String}
   *
   * @private
   */
  * _writeContents (dest, contents) {
    return yield fs.outputFile(dest, contents)
  }

  /**
   * writes template contents to a given destination.
   * @param  {String} template
   * @param  {String} dest
   * @param  {Object} options
   * @return {String}
   *
   * @public
   */
  * write (template, dest, options) {
    const contents = yield this._getContents(this._makeTemplatePath(template))
    const temp = hogan.compile(contents)
    const hasFile = yield this._hasFile(dest)
    if (hasFile) {
      throw new Error(`I am afraid ${path.basename(dest)} already exists`)
    }
    return yield this._writeContents(dest, temp.render(options))
  }

  /**
   * logs the completed message on the console by
   * making incrementalPath path
   * @param  {String} basePath [description]
   * @param  {String} toPath   [description]
   *
   * @private
   */
  _logCreate (basePath, toPath) {
    const regeExp = new RegExp(`${basePath}${path.sep}?`)
    const incrementalPath = toPath.replace(regeExp, '')
    this.completed('create', incrementalPath)
  }

}

module.exports = Base
