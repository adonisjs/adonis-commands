'use strict'

/**
 * adonis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const ServiceProvider = require('adonis-fold').ServiceProvider

class GeneratorsProvider extends ServiceProvider {

  constructor () {
    super()
    this.generators = ['Controller', 'Migration', 'Model', 'View', 'Command', 'Hook', 'Middleware']
  }

  * register() {
    this.generators.forEach((generator) => {
      this.app.bind(`Adonis/Commands/Make:${generator}`, (app) => {
        const Helpers = app.use('Adonis/Src/Helpers')
        const Generator = require(`../src/Generators/${generator}`)
        return new Generator(Helpers)
      })
    })
  }

}

module.exports =  GeneratorsProvider
