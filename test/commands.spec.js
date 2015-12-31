'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/
/* global it,describe,context,before,after */
const Ioc = require('adonis-fold').Ioc
const chai = require('chai')
const expect = chai.expect
const path = require('path')
const fs = require('co-fs-extra')
require('co-mocha')

const GeneratorHelpers = require('../src/Generators/helpers')
const ControllerGenerator = require('../src/Generators/Controller')
const CommandGenerator = require('../src/Generators/Command')
const MiddlewareGenerator = require('../src/Generators/Middleware')
const ModelGenerator = require('../src/Generators/Model')

let globalError = ''

describe('Generators', function () {
  before(function () {
    Ioc.bind('Adonis/Src/Ansi', function () {
      return {
        error: function (error) {
          globalError = error
        },
        success: function () {}
      }
    })
    Ioc.alias('Ansi', 'Adonis/Src/Ansi')
  })
  context('Helpers', function () {
    before(function * () {
      yield fs.emptydir(path.join(__dirname, './blueprints'))
    })

    after(function * () {
      yield fs.emptydir(path.join(__dirname, './blueprints'))
    })

    it('should join entity and name to form new name in pascal case', function () {
      const thisName = 'user'
      const newName = GeneratorHelpers.makeName(thisName, 'Controller')
      expect(newName).to.equal('UserController')
    })

    it('should remove entity name from actual name', function () {
      const thisName = 'userController'
      const newName = GeneratorHelpers.makeName(thisName, 'Controller')
      expect(newName).to.equal('UserController')
    })

    it('should remove entity name passed as snakeCase from actual name', function () {
      const thisName = 'user_Controller'
      const newName = GeneratorHelpers.makeName(thisName, 'Controller')
      expect(newName).to.equal('UserController')
    })

    it('should remove entity name when true is passed as 3rd argument', function () {
      const thisName = 'user'
      const newName = GeneratorHelpers.makeName(thisName, 'Model', true)
      expect(newName).to.equal('User')
    })

    it("should make controller method by passing it's name", function () {
      const name = 'index'
      const method = GeneratorHelpers.makeControllerMethod(name)
      expect(method.trim()).to.equal(`* ${name} (request, response) {}`)
    })

    it('should generate blueprint with given content to a given path', function * () {
      const name = 'UserController'
      const contents = 'module.exports = function ({})'
      const response = yield GeneratorHelpers.generateBlueprint(contents, path.join(__dirname, './blueprints/userController.js'), name)
      expect(response).to.match(/Created UserController/)
    })

    it('should throw an error when file already exists', function * () {
      const name = 'UserController'
      const contents = 'module.exports = function ({})'
      try {
        yield GeneratorHelpers.generateBlueprint(contents, path.join(__dirname, './blueprints/userController.js'), name)
      } catch (e) {
        expect(e.message).to.match(/I am afraid/)
      }
    })
  })

  context('Commands', function () {
    const Helpers = {
      appPath: function () {
        return __dirname
      }
    }
    before(function * () {
      Ioc.bind('Adonis/Src/Helpers', function () {
        return Helpers
      })
      yield fs.emptydir(path.join(__dirname, './Commands'))
    })

    after(function * () {
      yield fs.emptydir(path.join(__dirname, './Commands'))
    })

    it('should generate a new command using command handle method', function * () {
      yield CommandGenerator.handle({name: 'Greet'})
      const Command = require(path.join(__dirname, './Commands/Greet.js'))
      expect(Command.description).to.be.a('string')
      expect(Command.signature).to.be.a('string')
      expect(new Command().handle).to.be.a('function')
    })

    it('should handle error silently and make use of console error method to print the error', function * () {
      yield CommandGenerator.handle({name: 'Greet'}, {})
      expect(globalError).to.match(/I am afraid Greet.js already exists/)
    })
  })

  context('Controllers', function () {
    const Helpers = {
      appPath: function () {
        return __dirname
      }
    }

    before(function * () {
      Ioc.bind('Adonis/Src/Helpers', function () {
        return Helpers
      })
      yield fs.emptydir(path.join(__dirname, './Http/Controllers'))
    })

    after(function * () {
      yield fs.emptydir(path.join(__dirname, './Http/Controllers'))
    })

    it('should generate a new controller using controller handle method', function * () {
      yield ControllerGenerator.handle({name: 'User'}, {})
      const UserController = require(path.join(__dirname, './Http/Controllers/UserController.js'))
      const user = new UserController()
      expect(user.index).to.be.a('function')
      expect(user.show).to.be.a('function')
      expect(user.create).to.be.a('function')
      expect(user.store).to.be.a('function')
      expect(user.update).to.be.a('function')
      expect(user.destroy).to.be.a('function')
    })

    it('should generate a plain controller when plain flag is passed', function * () {
      yield ControllerGenerator.handle({name: 'Accounts'}, {plain: true})
      const AccountsController = require(path.join(__dirname, './Http/Controllers/AccountsController.js'))
      const accounts = new AccountsController()
      expect(accounts.index).to.equal(undefined)
      expect(accounts.create).to.equal(undefined)
      expect(accounts.store).to.equal(undefined)
      expect(accounts.show).to.equal(undefined)
      expect(accounts.update).to.equal(undefined)
      expect(accounts.destroy).to.equal(undefined)
    })

    it('should handle error silently and make use of console error method to print the error', function * () {
      yield ControllerGenerator.handle({name: 'Accounts'}, {})
      expect(globalError).to.match(/I am afraid AccountsController.js already exists/)
    })
  })

  context('Middleware', function () {
    const Helpers = {
      appPath: function () {
        return __dirname
      }
    }

    before(function * () {
      Ioc.bind('Adonis/Src/Helpers', function () {
        return Helpers
      })
      yield fs.emptydir(path.join(__dirname, './Http/Middleware'))
    })

    after(function * () {
      yield fs.emptydir(path.join(__dirname, './Http/Middleware'))
    })

    it('should generate a new middleware using middleware handle method', function * () {
      yield MiddlewareGenerator.handle({name: 'CorsMiddleware'}, {})
      const Cors = require(path.join(__dirname, './Http/Middleware/Cors.js'))
      const cors = new Cors()
      expect(cors.handle).to.be.a('function')
    })

    it('should handle error silently and make use of console error method to print the error', function * () {
      yield MiddlewareGenerator.handle({name: 'CorsMiddleware'}, {})
      expect(globalError).to.match(/I am afraid Cors.js already exists/)
    })
  })

  context('Model', function () {
    const Helpers = {
      appPath: function () {
        return __dirname
      }
    }

    class Lucid {
    }

    before(function * () {
      Ioc.bind('Adonis/Src/Helpers', function () {
        return Helpers
      })
      Ioc.bind('Lucid', function () {
        return Lucid
      })
      yield fs.emptydir(path.join(__dirname, './Model'))
    })

    after(function * () {
      yield fs.emptydir(path.join(__dirname, './Model'))
    })

    it('should generate a new model using model handle method', function * () {
      yield ModelGenerator.handle({name: 'UserModel'}, {})
      const User = require(path.join(__dirname, './Model/User.js'))
      const user = new User()
      expect(user instanceof Lucid).to.equal(true)
    })

    it('should handle error silently and make use of console error method to print the error', function * () {
      yield ModelGenerator.handle({name: 'UserModel'}, {})
      expect(globalError).to.match(/I am afraid User.js already exists/)
    })
  })
})
