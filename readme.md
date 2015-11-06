# Adonis commands
General server related commands for Adonis platform. Built on top of [PM2](https://github.com/Unitech/pm2) process manager for NodeJs. Servers for both production and development environments.

## Available commands and flags
All commands are described to be started with [Adonis Ace](https://github.com/adonisjs/ace)

### Start the server
All of the flags are passed to PM2, if you pass more instances than you have CPUs PM2 will default to _max_

command `./ace server:start`

optional flags:
- `--exec_mode` it can be _cluster_ of _fork_, defaults to fork if nothing is provided.
  - example `--exec_mode cluster`

- `--instances` it can be _number_ or _max_, if number is passed
  - example `--instances 4`

- `--memory_limit` it is a number that represents `max-memory-restart` flag in PM2.
  - example `--memory_limit 300`

Full example of start:server `./ace server:start --exec_mode cluster --instances 4 --memory_limit 300`

### Stop the server
command `./ace server:stop`

optional flags:
- `--delete` will stop the server and delete the app

### Reload the server
command `./ace server:reload`

optional flags : NONE

### Show running server
command `./ace server:show`

optional flags : NONE

### Show logs
command `./ace server:logs`

optional flags :
- `stream` this will attach to log monitor and show logs as they occur
- `flush` will flush the logs
