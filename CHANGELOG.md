<a name="2.1.1"></a>
## [2.1.1](https://github.com/adonisjs/adonis-commands/compare/v2.0.5...v2.1.1) (2016-09-26)


### Features

* add support for nested scaffolds ([622f349](https://github.com/adonisjs/adonis-commands/commit/622f349))
* **commands:** add route:list command ([#8](https://github.com/adonisjs/adonis-commands/issues/8)) ([91ffdd0](https://github.com/adonisjs/adonis-commands/commit/91ffdd0))


<a name="2.1.0"></a>
# [2.1.0](https://github.com/adonisjs/adonis-commands/compare/v2.0.5...v2.1.0) (2016-06-26)


### Bug Fixes

* **command:model:** Fix variable name for migration creation conditional([0e5eccd](https://github.com/adonisjs/adonis-commands/commit/0e5eccd))
* **generator:command:** update template to have instance getters([2362658](https://github.com/adonisjs/adonis-commands/commit/2362658))


### Features

* add support for nested scaffolds([622f349](https://github.com/adonisjs/adonis-commands/commit/622f349))
* **generate:hook:** add generator to create model hook([887bd17](https://github.com/adonisjs/adonis-commands/commit/887bd17))
* **generator:** Add generator to create APP_KEY([de71f3b](https://github.com/adonisjs/adonis-commands/commit/de71f3b))
* **generator:** Add listener generator([a4bf353](https://github.com/adonisjs/adonis-commands/commit/a4bf353))
* **generator:*:** implement arguments to define custom template path for a generator([4dffab7](https://github.com/adonisjs/adonis-commands/commit/4dffab7))
* **generator:command:** add generator to create a command([fa33a47](https://github.com/adonisjs/adonis-commands/commit/fa33a47))
* **generator:controller:** replace --plain flag with --resource([53d5c4b](https://github.com/adonisjs/adonis-commands/commit/53d5c4b))
* **generator:middleware:** add middleware generator([ecedcd9](https://github.com/adonisjs/adonis-commands/commit/ecedcd9))
* **generator:seed:** add seed generator([3071e43](https://github.com/adonisjs/adonis-commands/commit/3071e43))
* **generator:view:** add view generator([05e47a0](https://github.com/adonisjs/adonis-commands/commit/05e47a0))
* **generators:** Initiate model,migration and contoller generator([c8b7ea3](https://github.com/adonisjs/adonis-commands/commit/c8b7ea3))
* **repl:** Add repl command([f9e1b5e](https://github.com/adonisjs/adonis-commands/commit/f9e1b5e))
* **repl:** Add repl command([7307cce](https://github.com/adonisjs/adonis-commands/commit/7307cce))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/adonisjs/adonis-commands/compare/v2.0.5...v2.0.5) (2016-03-20)




<a name="2.0.4"></a>
## 2.0.4 (2016-03-20)


### Bug Fixes

* **controller:** add one restful method ([f5ea8e1](https://github.com/adonisjs/adonis-commands/commit/f5ea8e1))

### Features

* **migrations:** add new generator to make migrations ([b98cf94](https://github.com/adonisjs/adonis-commands/commit/b98cf94))
* **package:** added commitizen ([24de170](https://github.com/adonisjs/adonis-commands/commit/24de170))



<a name="2.0.3"></a>
## 2.0.3 (2016-01-29)


### Bug Fixes

* **controller:** add one restful method ([f5ea8e1](https://github.com/adonisjs/adonis-commands/commit/f5ea8e1))

### Features

* **package:** added commitizen ([24de170](https://github.com/adonisjs/adonis-commands/commit/24de170))



<a name="2.0.2"></a>
## 2.0.2 (2016-01-14)


### feat

* feat(package): added commitizen ([24de170](https://github.com/adonisjs/adonis-commands/commit/24de170))

### refactor

* refactor(generators): Generators make command now returns sensible success messages ([651ab96](https://github.com/adonisjs/adonis-commands/commit/651ab96))

* Added badges ([4fe87f5](https://github.com/adonisjs/adonis-commands/commit/4fe87f5))
* Added cli suport for migrations and generators ([6b6e49b](https://github.com/adonisjs/adonis-commands/commit/6b6e49b))
* Added command to view/flush logs ([2499cb3](https://github.com/adonisjs/adonis-commands/commit/2499cb3))
* Added CommandProvider to register all commands to Ioc container ([c18fe8e](https://github.com/adonisjs/adonis-commands/commit/c18fe8e))
* Added coveralls pipe to tests coverage, removed unwanted deps ([a2c6e10](https://github.com/adonisjs/adonis-commands/commit/a2c6e10))
* Added knex to module dependencies ([7725752](https://github.com/adonisjs/adonis-commands/commit/7725752))
* Added middleware command ([c495b35](https://github.com/adonisjs/adonis-commands/commit/c495b35))
* Added provider for logs command ([644024f](https://github.com/adonisjs/adonis-commands/commit/644024f))
* Added readme ([d03891c](https://github.com/adonisjs/adonis-commands/commit/d03891c))
* Added server commands ([35ad547](https://github.com/adonisjs/adonis-commands/commit/35ad547))
* Added standard hook ([11b3c51](https://github.com/adonisjs/adonis-commands/commit/11b3c51))
* Added travis file ([1fd8356](https://github.com/adonisjs/adonis-commands/commit/1fd8356))
* Destorying knex instance after migration commands ([82dcead](https://github.com/adonisjs/adonis-commands/commit/82dcead))
* Fixed proxies flag , was using __ instead of _ ([b90698a](https://github.com/adonisjs/adonis-commands/commit/b90698a))
* Fixed wrong depdendencies ([7232831](https://github.com/adonisjs/adonis-commands/commit/7232831))
* Fixed wrong value returned from provider binding ([b6c09e7](https://github.com/adonisjs/adonis-commands/commit/b6c09e7))
* Formatted ([de945ea](https://github.com/adonisjs/adonis-commands/commit/de945ea))
* Formatted src files ([c3ab5d3](https://github.com/adonisjs/adonis-commands/commit/c3ab5d3))
* Formatted test files ([5a28652](https://github.com/adonisjs/adonis-commands/commit/5a28652))
* Formatted test files ([b1d455b](https://github.com/adonisjs/adonis-commands/commit/b1d455b))
* Got refactored basic generators and their tests ([cf03c91](https://github.com/adonisjs/adonis-commands/commit/cf03c91))
* Linted using standard ([f5dadeb](https://github.com/adonisjs/adonis-commands/commit/f5dadeb))
* Made changes required by latest version of ace ([6a5b8d2](https://github.com/adonisjs/adonis-commands/commit/6a5b8d2))
* Merge branch 'feature-clean-commands' into develop ([1e774c6](https://github.com/adonisjs/adonis-commands/commit/1e774c6))
* Merge branch 'feature-lint-code' into develop ([f588124](https://github.com/adonisjs/adonis-commands/commit/f588124))
* Merge branch 'release-2.0.1' into develop ([c865526](https://github.com/adonisjs/adonis-commands/commit/c865526))
* Merge branch 'release-2.0' into develop ([56fd3f6](https://github.com/adonisjs/adonis-commands/commit/56fd3f6))
* Moved all files to their own folders ([e7c8226](https://github.com/adonisjs/adonis-commands/commit/e7c8226))
* npm version bumo ([ccfaa68](https://github.com/adonisjs/adonis-commands/commit/ccfaa68))
* npm version bump ([68b6e0f](https://github.com/adonisjs/adonis-commands/commit/68b6e0f))
* npm version bump ([7fa8f37](https://github.com/adonisjs/adonis-commands/commit/7fa8f37))
* npm version bump ([152b6c4](https://github.com/adonisjs/adonis-commands/commit/152b6c4))
* npm version bump ([ce45d0e](https://github.com/adonisjs/adonis-commands/commit/ce45d0e))
* Npm version bump ([c2e030e](https://github.com/adonisjs/adonis-commands/commit/c2e030e))
* Remove depedency from database provider , instead using internal knex ([c140d24](https://github.com/adonisjs/adonis-commands/commit/c140d24))
* Removed sqlite from dev deps ([e1ed90f](https://github.com/adonisjs/adonis-commands/commit/e1ed90f))
* Removed unncessary commands and depedencies ([e42b687](https://github.com/adonisjs/adonis-commands/commit/e42b687))
* Removed unrequired bindings from providers ([b90d0dc](https://github.com/adonisjs/adonis-commands/commit/b90d0dc))
* style(readme,contributing,license): Improved readme and added github necessary files ([119a974](https://github.com/adonisjs/adonis-commands/commit/119a974))
* Update peer dependencies ([da9a7f3](https://github.com/adonisjs/adonis-commands/commit/da9a7f3))
* Updated dependencies ([487c994](https://github.com/adonisjs/adonis-commands/commit/487c994))
* Updated peer deps ([b609583](https://github.com/adonisjs/adonis-commands/commit/b609583))
* Updated providers ([5366856](https://github.com/adonisjs/adonis-commands/commit/5366856))
* Updates deps ([db69a32](https://github.com/adonisjs/adonis-commands/commit/db69a32))
* Using ace as a peer dependency ([036da33](https://github.com/adonisjs/adonis-commands/commit/036da33))
* Using any version for peer dependencies ([ef61897](https://github.com/adonisjs/adonis-commands/commit/ef61897))



