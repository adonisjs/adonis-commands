'use strict'

/**
 * adonis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/* global describe, it, before, beforeEach, after, context */
const Ioc = require('adonis-fold').Ioc
const chai = require('chai')
const path = require('path')
const fs = require('co-fs-extra')
const expect = chai.expect
require('co-mocha')

class Command {
  completed () {}
}

Ioc.bind('Adonis/Src/Command', function () {
  return Command
})
const Generator = require('../../src/Generators/Base')
const ControllerGenerator = require('../../src/Generators/Controller')
const ModelGenerator = require('../../src/Generators/Model')
const MigrationGenerator = require('../../src/Generators/Migration')

const Helpers = {
  appPath: () => path.join(__dirname, './app'),
  migrationsPath: (file) => {
    return path.join(__dirname, './app/migrations/', file)
  },
  basePath: () => this.appPath
}

describe('Generator', function () {
  before(function * () {
    yield fs.emptyDir(path.join(__dirname, './app'))
  })

  after(function * () {
    yield fs.emptyDir(path.join(__dirname, './app'))
  })

  it('should make a template name for a given entity', function () {
    const gen = new Generator()
    const controllerName = gen._makeEntityName('userscontroller', 'controller', true)
    expect(controllerName).to.equal('UsersController')
  })

  it('should not prefix the entity when not required', function () {
    const gen = new Generator()
    const modelName = gen._makeEntityName('usersmodel', 'model', false)
    expect(modelName).to.equal('Users')
  })

  it('should singularize a name when defined', function () {
    const gen = new Generator()
    const modelName = gen._makeEntityName('usersmodel', 'model', false, 'singular')
    expect(modelName).to.equal('User')
  })

  it('should pluralize a name when defined', function () {
    const gen = new Generator()
    const controllerName = gen._makeEntityName('user-controller', 'controller', true, 'plural')
    expect(controllerName).to.equal('UsersController')
  })

  it('should copy a template to the destination path', function * () {
    const controllerGen = new Generator(Helpers)
    const options = {
      name: 'test',
      plain: true
    }
    const controllerPath = path.join(__dirname, './app/test')
    yield controllerGen.write('controller', controllerPath, options)
    const userController = require(controllerPath)
    expect(userController.name).to.equal('test')
  })

  it('should throw an error when destination path already exists', function * () {
    const controllerGen = new Generator(Helpers)
    const options = {
      name: 'test',
      plain: true
    }
    const controllerPath = path.join(__dirname, './app/test')
    try {
      yield controllerGen.write('controller', controllerPath, options)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.match(/I am afraid test already exists/)
    }
  })

  context('Controller', function () {
    it('should create a controller file', function * () {
      const controllerGen = new ControllerGenerator(Helpers)
      yield controllerGen.handle({name: 'UserPlain'}, {plain: true})
      const Controller = require(path.join(Helpers.appPath(), 'Http/Controllers/UserPlainController.js'))
      expect(Controller.name).to.equal('UserPlainController')
    })

    it('should create a controller file with predefined methods', function * () {
      const controllerGen = new ControllerGenerator(Helpers)
      yield controllerGen.handle({name: 'User'}, {})
      const Controller = require(path.join(Helpers.appPath(), 'Http/Controllers/UserController.js'))
      const controllerInstance = new Controller()
      const methods = ['index', 'create', 'store', 'show', 'edit', 'update', 'destroy']
      methods.forEach((method) => expect(controllerInstance[method]).to.be.a('function'))
    })
  })

  context('Model', function () {
    before(function () {
      Ioc.bind('Lucid', function () {
        return class Lucid {}
      })
    })
    it('should create a model file', function * () {
      const modelGen = new ModelGenerator(Helpers)
      yield modelGen.handle({name: 'UsersModel'}, {})
      const Model = require(path.join(Helpers.appPath(), 'Model/User.js'))
      expect(Model.name).to.equal('User')
    })

    it('should specify table name when defined', function * () {
      const modelGen = new ModelGenerator(Helpers)
      yield modelGen.handle({name: 'Supplier'}, {table: 'allSupplier'})
      const Model = require(path.join(Helpers.appPath(), 'Model/Supplier.js'))
      expect(Model.table).to.equal('allSupplier')
    })

    it('should specify connection name when defined', function * () {
      const modelGen = new ModelGenerator(Helpers)
      yield modelGen.handle({name: 'Profile'}, {connection: 'Mysql'})
      const Model = require(path.join(Helpers.appPath(), 'Model/Profile.js'))
      expect(Model.connection).to.equal('Mysql')
    })
  })

  context('Migrations', function () {
    beforeEach(function () {
      class Schema {
        constructor () {
          this.payload = {}
        }
        create (table) {
          this.payload = {
            method: 'create',
            table: table
          }
        }
        table (table) {
          this.payload = {
            method: 'table',
            table: table
          }
        }
      }
      Ioc.bind('Schema', function () {
        return Schema
      })
    })

    it('should create a migrations file', function * () {
      const migrationGen = new MigrationGenerator(Helpers)
      yield migrationGen.handle({name: 'User'}, {})
      const Migration = require(Helpers.migrationsPath('User'))
      expect(Migration.name).to.equal('UserSchema')
      const migrationInstance = new Migration()
      expect(migrationInstance.up).to.be.a('function')
      expect(migrationInstance.down).to.be.a('function')
    })

    it('should define user_table as the table name for the migration', function * () {
      const migrationGen = new MigrationGenerator(Helpers)
      yield migrationGen.handle({name: 'UserTable'}, {})
      const Migration = require(Helpers.migrationsPath('UserTable'))
      expect(Migration.name).to.equal('UserTableSchema')
      const migrationInstance = new Migration()
      migrationInstance.up()
      expect(migrationInstance.payload.method).to.equal('table')
      expect(migrationInstance.payload.table).to.equal('user_table')
    })

    it('should call create method when passing --create flag', function * () {
      const migrationGen = new MigrationGenerator(Helpers)
      yield migrationGen.handle({name: 'Account'}, {create: 'accounts'})
      const Migration = require(Helpers.migrationsPath('Account'))
      expect(Migration.name).to.equal('AccountSchema')
      const migrationInstance = new Migration()
      migrationInstance.up()
      expect(migrationInstance.payload.method).to.equal('create')
      expect(migrationInstance.payload.table).to.equal('accounts')
    })

    it('should define the static connection method when --connection flag is passed', function * () {
      const migrationGen = new MigrationGenerator(Helpers)
      yield migrationGen.handle({name: 'Profile'}, {create: 'profiles', connection: 'Mysql'})
      const Migration = require(Helpers.migrationsPath('Profile'))
      expect(Migration.name).to.equal('ProfileSchema')
      expect(Migration.connection).to.equal('Mysql')
    })
  })
})
