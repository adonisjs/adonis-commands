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
    name = name.split(path.sep)
    let baseName = name.pop()
    const method = `${noun}ize`
    const regExp = new RegExp(`-?_?${entity}`, 'g')
    baseName = i.underscore(baseName).replace(regExp, '')
    baseName = i[method] ? i[method](baseName) : baseName
    const entityName = needPrefix ? i.camelize(`${baseName}_${entity}`) : i.camelize(baseName)
    name.push(entityName)
    return {entityPath: name.join(path.sep), entityName}
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
   *
   * @param  {String} template
   * @param  {String} dest
   * @param  {Object} options
   * @return {String}
   *
   * @public
   */
  * write (template, dest, options) {
    template = template.endsWith('.mustache') ? template : this._makeTemplatePath(template)
    const contents = yield this._getContents(template)
    const temp = hogan.compile(contents)
    const hasFile = yield this._hasFile(dest)
    if (hasFile) {
      throw new Error(`I am afraid ${this._incrementalPath(dest)} already exists`)
    }
    return yield this._writeContents(dest, temp.render(options))
  }

  /**
   * returns incremental path for a given absolute path
   *
   * @param  {String} toPath
   * @return {String}
   *
   * @private
   */
  _incrementalPath (toPath) {
    const regeExp = new RegExp(`${this.helpers.basePath()}${path.sep}?`)
    return toPath.replace(regeExp, '')
  }

  /**
   * logs the completed message on the console by
   * making incrementalPath path
   *
   * @param  {String} toPath
   *
   * @private
   */
  _success (toPath) {
    const incrementalPath = this._incrementalPath(toPath)
    this.completed('create', incrementalPath)
  }

  /**
   * logs error to the console
   *
   * @param  {String} error
   *
   * @private
   */
  _error (error) {
    this.error(error)
  }

  /**
   * writes file to a given destination and automatically logs
   * errors and success messages to the terminal.
   *
   * @param  {String} entity
   * @param  {String} dest
   * @param  {Object} options
   *
   * @private
   */
  * _wrapWrite (entity, dest, options) {
    try {
      yield this.write(entity, dest, options)
      this._success(dest)
    } catch (e) {
      this._error(e.message)
    }
  }

}

module.exports = Base
