'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

class Run {

  constructor (Helpers, Database, Ansi) {
    this.helpers = Helpers
    this.database = Database
    this.ansi = Ansi
  }

  /**
   * command description
   * @return {String}
   */
  get description () {
    return 'Run latest migrations to create/modify database tables'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  get signature () {
    return 'migration:run {--force?}'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to run all migrations
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
      throw new Error('Migrations can run in development environment only , use --force to run in other environments')
    }

    /**
     * making path to migrations folder
     */
    const migrationPath = this.helpers.migrationsPath()

    /**
     * calling knex migration latest method
     */
    const run = yield this.database.migrate.latest({
      directory: migrationPath,
      tableName: 'adonis_migrations'
    })

    if (typeof (run) !== 'object' && run.length === 0) {
      throw new Error('Unable to run migrations , make sure database is properly configured')
    }

    const batch = run[0]
    const files = run[1]

    if (files.length === 1) {
      self.ansi.info('Already upto date')
    }

    self.ansi.output('yellow', `\nRunning batch ${batch}`)
    files.forEach(function (file) {
      console.log('  ' + file.replace(migrationPath, 'migrations'), self.ansi.icon('success'))
    })

  }

}

module.exports = Run
