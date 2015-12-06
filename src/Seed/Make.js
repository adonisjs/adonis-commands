'use strict';

const knex = require('knex')

class Make {

  static get inject() {
    return ['Adonis/Src/Helpers', 'Adonis/Src/Env', 'Adonis/Addons/Config']
  }

  constructor(Helpers, Env, Config) {
    this.helpers = Helpers
    this.env = Env
    this.config = Config
  }

  /**
   * command description
   * @return {String}
   */
  static get description() {
    return 'Generate a new seed file'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  static get signature() {
    return 'seed:make {name}'
  }

  * handle(options, flags) {
    /**
     * grabbing seed name
     */
    const name = options.name

    /**
     * making path to seeds folder
     */

    /**
     * TODO Make helper for seedsPath
     */
    const seedsPath = this.helpers.seedsPath()

    /**
     * grabbing current db connection
     */
    const dbConnection = this.env.get('DB_CONNECTION')

    if (!dbConnection) {
      throw new Error('Define DB_CONNECTION inside .env file to make use of seeds')
    }

    /**
     * grabbing connection settings from Config provider
     */
    const dbSettings = this.config.get(`database.${dbConnection}`)

    if (!dbSettings) {
      throw new Error('Unable to find connection ' + dbSettings + ' under config/database.file')
    }

    /**
     * making knex instance
     */
    const database = knex(dbSettings)

    /**
     * calling knex seed make method
     */
    const make = yield database.seed.make(name, {
      directory: seedsPath
    })

    /**
     * if command was successful it will return the path to seed
     * as string , if response is not a string , then something
     * went bad
     */

    database.destroy()

    if (typeof(make) === 'string') {
      const seedName = make.replace(seedsPath, 'seeds')
      return `Created ${seedName} successfully !`
    }

    throw new Error('Unable to generate seed , make sure database credentials are right')

  }

}

module.exports = Make
