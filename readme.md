# Adonis Commands

[![Gitter](https://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square)](https://gitter.im/adonisjs/adonis-framework)
[![Trello](https://img.shields.io/badge/TRELLO-%E2%86%92-89609E.svg?style=flat-square)](https://trello.com/b/yzpqCgdl/adonis-for-humans)
[![Version](https://img.shields.io/npm/v/adonis-commands.svg?style=flat-square)](https://www.npmjs.com/package/adonis-commands)
[![Build Status](https://img.shields.io/travis/adonisjs/adonis-commands/master.svg?style=flat-square)](https://travis-ci.org/adonisjs/adonis-commands)
[![Coverage Status](https://img.shields.io/coveralls/adonisjs/adonis-commands/master.svg?style=flat-square)](https://coveralls.io/github/adonisjs/adonis-commands?branch=master)
[![Downloads](https://img.shields.io/npm/dt/adonis-commands.svg?style=flat-square)](https://www.npmjs.com/package/adonis-commands)
[![License](https://img.shields.io/npm/l/adonis-framework.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> :pray: Commands to scaffold AdonisJs application.

This repo contains commands used by [ace](http://adonisjs.com/docs/2.0/ace-commands) to do common tasks from command line. It includes generators for:

- Controllers
- Models
- View
- Commands
- Listeners
- Hooks
- Middleware
- Migrations
- Seeds

You can learn more about AdonisJS and all of its awesomeness on http://adonisjs.com :evergreen_tree:

## Table of Contents

* [Team Members](#team-members)
* [Getting Started](#getting-started)
* [Contribution Guidelines](#contribution-guidelines)

## <a name="team-members"></a>Team Members

* Harminder Virk [Profile](http://github.com/thetutlage) <virk@adonisjs.com>

## <a name="getting-started"></a>Getting Started

The package is already integrated into AdonisJs and you are good to make use of defined commands.

### Controllers

```bash
./ace make:controller User
```

Or

```bash
./ace make:controller User --resource
```

### Models

```bash
./ace make:model User
```

Also create migration for this model

```bash
./ace make:model User --migration
```

Define table for the generated migration

```bash
./ace make:model User --migration --table=users
```

Define different connection for model and migration

```bash
./ace make:model User --migration --table=users --connection=mysql
```

### Migrations

```bash
./ace make:migration users
```

Define table to be selected for alter

```bash
./ace make:migration users --table=users
```

Define table to be selected for creation

```bash
./ace make:migration users --create=users
```

Define a different connection for migration

```bash
./ace make:migration users --connection=pg
```

### View

```bash
./ace make:view welcome
```

Define a template to extend

```bash
./ace make:view welcome --extend=master
```

### Command

```bash
./ace make:command Greet
```

### Model Hook

```bash
./ace make:hook User
```

Define a method to be created on the Model Hook.

```bash
./ace make:hook User --method=encryptPassword
```

### Middleware

```bash
./ace make:middleware RateLimit
```

### Seed

```bash
./ace make:seed Users
```

### Events Listener

```bash
./ace make:listener Emailer
```

Define a method to be created on the listener.

```bash
./ace make:listener Emailer --method=sendWelcomeEmail
```


## <a name="contribution-guidelines"></a>Contribution Guidelines

In favor of active development we accept contributions for everyone. You can contribute by submitting a bug, creating pull requests or even improving documentation.

You can find a complete guide to be followed strictly before submitting your pull requests in the [Official Documentation](http://adonisjs.com/docs/community).
