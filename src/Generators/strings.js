'use strict'

/**
 * adonis-commands
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

let strings = exports = module.exports = {}

strings.command = `'use strict'

const Console = use("Console")

class {{name}} {

  static get description () {
    return 'Description for your command , it is good to have nice descriptions'
  }

  static get signature () {
    return '{optionName} {optionName2} {--flag} {--flag2}'
  }

  * handle (options, flags) {
    // handle your command executation here
  }

}

module.exports = {{name}}
`

strings.controller = `'use strict'

class {{name}} {
  {{index}}{{create}}{{store}}{{show}}{{update}}{{destroy}}
}

module.exports = {{name}}
`

strings.middleware = `'use strict'

class {{name}} {

  *handle (request, response, next) {
    // yield next once middleware expectation
    // have been satisfied
  }

}

module.exports = {{name}}
`

strings.model = `'use strict'

const Lucid = use("Lucid")

class {{name}} extends Lucid {

}

module.exports = {{name}}
`
