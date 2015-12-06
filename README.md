# adonis-commands
Set of core commands for adonis framework

## Available commands and flags
All commands are described to be started with [Adonis Ace](https://github.com/adonisjs/ace)

### Seed make
Command supported by knex.js

command `./ace seed:make {seedName}`

Example of seed:

```
exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('users').del(), 

        // Inserts seed entries
        knex('users').insert({user_name: 'testUserBySeed', passkey: 'passkey'})
        
    );
};
```
P.S.: for better experience use [Faker.js](https://github.com/marak/faker.js) to generate test fake data.
