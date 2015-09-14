'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

class Make{

  constructor(Helpers,Database){
    this.helpers = Helpers
    this.database = Database
  }

  /**
   * command description
   * @return {String}
   */
  get description(){
    return 'Generate a new migration file'
  }

  /**
   * command signature used by ace
   * @return {String}
   */
  get signature(){
    return 'migration:make {name}'
  }

  /**
   * @function handle
   * @description invoked by ace is a method to generate a new migration file
   * @param  {Object} options
   * @param  {Object} flags
   * @return {String}
   */
  *handle (options,flags){

    /**
     * grabbing migration name
     */
    const name = options.name

    /**
     * making path to migrations folder
     */
    const migrationPath = this.helpers.migrationsPath()

    /**
     * calling knex migration make method
     */
    const make = yield this.database.migrate.make(name,{
      directory : migrationPath,
      tableName: 'adonis_migrations'
    })

    /**
     * if command was successful it will return the path to migration
     * as string , if response is not a string , then something
     * went bad
     */
    if(typeof(make) === 'string'){
      const migrationName = make.replace(migrationPath,'migrations')
      return `Created ${migrationName} successfully !`
    }

    throw new Error('Unable to generate migration , make sure database credentials are right')

  }

}

module.exports = Make;
