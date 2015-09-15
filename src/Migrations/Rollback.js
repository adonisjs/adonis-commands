'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const knex = require('knex')

class Rollback {

  static get inject() {
    return ['Adonis/Src/Helpers','Adonis/Src/Env','Adonis/Addons/Config','Adonis/Addons/Ansi']
  }

  constructor (Helpers, Env, Config, Ansi) {
    this.helpers = Helpers
    this.env = Env
    this.config = Config
    this.ansi = Ansi
  }

  /**
   * command description
   * @return {String}
   */
  static get description () {
    return 'Rollback latest migrations'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  static get signature () {
    return 'migration:rollback {--force?}'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to rollback all migrations
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  * handle (options, flags) {
    /**
     * getting force flag , as by default we do not run
     * migrations in production environment
     */
    const force = flags.force || false

    const self = this

    if (process.env.NODE_ENV !== 'development' && !force) {
      throw new Error('Migrations can be rolled back in development environment only , use --force to rollback in other environments')
    }

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
     * calling knex migration rollback method
     */
    const run = yield database.migrate.rollback({
      directory: migrationPath,
      tableName: 'adonis_migrations'
    })

    database.destroy()

    if (typeof (run) !== 'object' && run.length === 0) {
      throw new Error('Unable to run migrations , make sure database is properly configured')
    }

    const batch = run[0]
    const files = run[1]

    if (files.length === 1) {
      self.ansi.info('Already at the base migration')
    }

    self.ansi.output('yellow', `\ Batch rolled back: ${batch}`)
    files.forEach(function (file) {
      console.log('  ' + file.replace(migrationPath, 'migrations'), self.ansi.icon('success'))
    })

  }

}

module.exports = Rollback
