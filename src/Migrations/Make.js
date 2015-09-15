'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const knex = require('knex')

class Make {

  static get inject() {
    return ['Adonis/Src/Helpers','Adonis/Src/Env','Adonis/Addons/Config']
  }

  constructor (Helpers, Env, Config) {
    this.helpers = Helpers
    this.env = Env
    this.config = Config
  }

  /**
   * command description
   * @return {String}
   */
  static get description () {
    return 'Generate a new migration file'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  static get signature () {
    return 'migration:make {name}'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to generate a new migration file
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  * handle (options, flags) {
    /**
     * grabbing migration name
     */
    const name = options.name

    /**
     * making path to migrations folder
     */
    const migrationPath = this.helpers.migrationsPath()

    /**
     * grabbing current db connection
     */
    const dbConnection = this.env.get('DB_CONNECTION')

    if(!dbConnection){
      throw new Error('Define DB_CONNECTION inside .env file to make use of migrations')
    }

    /**
     * grabbing connection settings from Config provider
     */
    const dbSettings = this.config.get(`database.${dbConnection}`)

    if(!dbSettings){
      throw new Error('Unable to find connection ' + dbSettings + ' under config/database.file')
    }

    /**
     * making knex instance
     */
    const database = knex(dbSettings)

    /**
     * calling knex migration make method
     */
    const make = yield database.migrate.make(name, {
      directory: migrationPath,
      tableName: 'adonis_migrations'
    })

    /**
     * if command was successful it will return the path to migration
     * as string , if response is not a string , then something
     * went bad
     */
    if (typeof (make) === 'string') {
      const migrationName = make.replace(migrationPath, 'migrations')
      return `Created ${migrationName} successfully !`
    }

    throw new Error('Unable to generate migration , make sure database credentials are right')

  }

}

module.exports = Make
