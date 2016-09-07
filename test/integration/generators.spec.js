'use strict'

/**
 * ado.nis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
/* global describe, it, before, after, context */
const chai = require('chai')
const setup = require('./setup')
const fs = require('co-fs-extra')
const path = require('path')
const dotEnv = require('dotenv')
const expect = chai.expect
require('co-mocha')

describe('Generators', function () {
  before(function * () {
    yield setup.start()
    yield setup.registerProviders()
    setup.registerCommands()
  })

  after(function * () {
    yield setup.end()
  })

  context('Migration', function () {
    it('should create a new migration', function * () {
      yield setup.invokeCommand('make:migration', ['User'], {create: 'users'})
      const UsersTableSchema = require('./app/migrations/User.js')
      expect(UsersTableSchema.name).to.equal('UsersTableSchema')
      expect(typeof (new UsersTableSchema().up)).to.equal('function')
      expect(typeof (new UsersTableSchema().down)).to.equal('function')
    })
  })

  context('Controller', function () {
    it('should create a new controller', function * () {
      yield setup.invokeCommand('make:controller', ['User'], {resource: true})
      const UserController = require('./app/Http/Controllers/UserController.js')
      const user = new UserController()
      expect(UserController.name).to.equal('UserController')
      expect(typeof (user.index)).to.equal('function')
      expect(typeof (user.create)).to.equal('function')
      expect(typeof (user.store)).to.equal('function')
      expect(typeof (user.show)).to.equal('function')
      expect(typeof (user.edit)).to.equal('function')
      expect(typeof (user.update)).to.equal('function')
      expect(typeof (user.destroy)).to.equal('function')
    })
  })

  context('Model', function () {
    it('should create a new model', function * () {
      yield setup.invokeCommand('make:model', ['User'], {})
      const UserModel = require('./app/Model/User.js')
      expect(UserModel.name).to.equal('User')
    })
  })

  context('View', function () {
    it('should create a template view', function * () {
      yield setup.invokeCommand('make:view', ['home'], {})
      const view = yield fs.readFile(path.join(__dirname, './app/views/home.njk'), 'utf-8')
      expect(view).to.be.a('string')
    })

    it('should be able to extend a master view', function * () {
      yield setup.invokeCommand('make:view', ['user'], {extend: 'master'})
      const view = yield fs.readFile(path.join(__dirname, './app/views/user.njk'), 'utf-8')
      expect(view.trim()).to.equal('{% extends \'master\' %}')
    })

    it('should be able to create nested views', function * () {
      yield setup.invokeCommand('make:view', ['post/list'], {})
      const view = yield fs.readFile(path.join(__dirname, './app/views/post/list.njk'), 'utf-8')
      expect(view).to.be.a('string')
    })
  })

  context('Command', function () {
    it('should create a command', function * () {
      yield setup.invokeCommand('make:command', ['greet'], {})
      const GreetCommand = require('./app/Commands/Greet.js')
      expect(GreetCommand.name).to.equal('Greet')
    })
  })

  context('Hook', function () {
    it('should create a hook', function * () {
      yield setup.invokeCommand('make:hook', ['user'], {})
      const userHook = require('./app/Model/Hooks/User.js')
      expect(userHook).to.be.an('object')
      expect(typeof (userHook.methodName)).to.equal('function')
    })

    it('should create a hook with a given method', function * () {
      yield setup.invokeCommand('make:hook', ['account'], {method: 'validate'})
      const accountHook = require('./app/Model/Hooks/Account.js')
      expect(accountHook).to.be.an('object')
      expect(typeof (accountHook.validate)).to.equal('function')
    })
  })

  context('Listener', function () {
    it('should create a listener', function * () {
      yield setup.invokeCommand('make:listener', ['http'], {})
      const httpListener = require('./app/Listeners/Http.js')
      expect(httpListener).to.be.an('object')
      expect(typeof (httpListener.methodName)).to.equal('function')
    })

    it('should create a listener with a given method', function * () {
      yield setup.invokeCommand('make:listener', ['auth'], {method: 'login'})
      const authListener = require('./app/Listeners/Auth.js')
      expect(authListener).to.be.an('object')
      expect(typeof (authListener.login)).to.equal('function')
    })
  })

  context('Middleware', function () {
    it('should create a middleware', function * () {
      yield setup.invokeCommand('make:middleware', ['Cors'], {})
      const CorsMiddleware = require('./app/Http/Middleware/Cors.js')
      expect(CorsMiddleware.name).to.equal('Cors')
    })

    it('should create a nested middleware', function * () {
      yield setup.invokeCommand('make:middleware', ['Api/Auth'], {})
      const AuthMiddleware = require('./app/Http/Middleware/Api/Auth.js')
      expect(AuthMiddleware.name).to.equal('Auth')
    })
  })

  context('Seed', function () {
    it('should create a seed file', function * () {
      yield setup.invokeCommand('make:seed', ['User'], {})
      const UserSeeder = require('./app/seeds/User.js')
      expect(UserSeeder.name).to.equal('UserSeeder')
    })
  })

  context('Key', function () {
    it('should generate app key inside .env file', function * () {
      const envContents = ['NODE_ENV = production', 'DB_CONNECTION=sqlite3'].join('\n')
      const envPath = path.join(__dirname, './app/.env')
      yield fs.outputFile(envPath, envContents)
      yield setup.invokeCommand('key:generate', [], {})
      const writtenContents = yield fs.readFile(envPath, 'utf-8')
      expect(dotEnv.parse(writtenContents).APP_KEY.length).to.equal(32)
    })

    it('should generate app key inside .env file with a defined size', function * () {
      const envPath = path.join(__dirname, './app/.env')
      yield setup.invokeCommand('key:generate', [], {size: 16})
      const writtenContents = yield fs.readFile(envPath, 'utf-8')
      expect(dotEnv.parse(writtenContents).APP_KEY.length).to.equal(16)
    })

    it('should be able to define .env path', function * () {
      const envPath = path.join(__dirname, './app/tmp/.env')
      const envContents = ['NODE_ENV = production', 'DB_CONNECTION=sqlite3'].join('\n')
      yield fs.outputFile(envPath, envContents)
      yield setup.invokeCommand('key:generate', [], {env: 'tmp/.env'})
      const writtenContents = yield fs.readFile(envPath, 'utf-8')
      expect(dotEnv.parse(writtenContents).APP_KEY.length).to.equal(32)
    })
  })
})
