architect-knex
=================

Expose knex query builder *knex* as architect plugin. 

### Installation

```sh
npm install --save architect-knex
```

### Usage

Boot [Architect](https://github.com/c9/architect) :

```js
var path = require('path');
var architect = require("architect");

var config = architect.loadConfig(path.join(__dirname, "config.js"));

architect.createApp(config, function (err, app) {
    if (err) {
        throw err;
    }
    console.log("app ready");
});
```

Configure Architect with `config.js` to access a SQLite3 in memory database *:

```js
module.exports = [{
    packagePath: "architect-knex",
    settings: {
        dialect: 'sqlite3',
        connection: {
            database: ':memory:test'
        }
    }
}, './repos'];
* Don't miss to add sqlite3 in your project dependency 
```
 
Consume *knex* plugin in your `./repos/package.json` :

```js
{
  "name": "repos",
  "main": "index.js",
  "private": true,

  "plugin": {
    "consumes": ["knex"]
  }
}
```