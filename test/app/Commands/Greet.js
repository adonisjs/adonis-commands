'use strict'

const Console = use("Console")

class Greet extends Console {

  static get description(){
    return 'Description for your command , it is good to have nice descriptions'
  }

  static get signature(){
    return 'commandName {optionName} {optionName2} {--flog} {--flog2}'
  }

  *handle (options,flags) {

    // handle your command executation here

  }

}

module.exports = Greet
