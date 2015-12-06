'use strict'

const knex = require('knex')

class Run {

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
    return 'Run seeds to insert some data to tables'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  static get signature () {
    return 'seed:run {--force?}'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to run all seeds
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  * handle (options, flags) {

    /**
     * getting force flag , as by default we do not run
     * seeds in production environment
     */
    const force = flags.force || false

    const self = this

    if (process.env.NODE_ENV !== 'development' && !force) {
      throw new Error('Seeds can run in development environment only , use --force to run in other environments')
    }

    /**
     * making path to seeds folder
     */
    const seedsPath = this.helpers.seedsPath()

    /**
     * grabbing current db connection
    */
    const dbConnection = this.env.get('DB_CONNECTION')

    if(!dbConnection){
      throw new Error('Define DB_CONNECTION inside .env file to make use of seeds')
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
     * calling knex seed method
     */
    const run = yield database.seed.run({
      directory: seedsPath
    })

    database.destroy()

    if (typeof (run) !== 'object' && run.length === 0) {
      throw new Error('Unable to run seeds, make sure database is properly configured')
    }

    const batch = run[0]

    self.ansi.output('yellow', `\nRunning batch ${batch}`)

  }

}

module.exports = Run
