//
// ShellJS
// Unix shell commands on top of Node's API
//
// Copyright (c) 2012 Artur Adib
// http://github.com/./shelljs
//

const common = require('./src/common')

// @
// @ All commands run synchronously, unless otherwise stated.
// @ All commands accept standard bash globbing characters (`*`, `?`, etc.),
// @ compatible with the [node `glob` module](https://github.com/isaacs/node-glob).
// @
// @ For less-commonly used commands and features, please check out our [wiki
// @ page](https://github.com/././wiki).
// @

// Include the docs for all the default commands
// @commands
const cat = require('./src/cat')
const cd = require('./src/cd')
const chmod = require('./src/chmod')
const cp = require('./src/cp')
const dirs = require('./src/dirs')
const echo = require('./src/echo')
const exec = require('./src/exec')
const find = require('./src/find')
const grep = require('./src/grep')
const head = require('./src/head')
const ln = require('./src/ln')
const ls = require('./src/ls')
const mkdir = require('./src/mkdir')
const mv = require('./src/mv')
const pwd = require('./src/pwd')
const rm = require('./src/rm')
const sed = require('./src/sed')
const set = require('./src/set')
const sort = require('./src/sort')
const tail = require('./src/tail')
const tempdir = require('./src/tempdir')
const test = require('./src/test')
const to = require('./src/to')
const toEnd = require('./src/toEnd')
const touch = require('./src/touch')
const uniq = require('./src/uniq')
const which = require('./src/which')

// @
// @ ### exit(code)
// @
// @ Exits the current process with the given exit `code`.
exports.exit = process.exit

// @include ./src/error
exports.error = require('./src/error')

// @include ./src/common
exports.ShellString = common.ShellString

// @
// @ ### env['VAR_NAME']
// @
// @ Object containing environment variables (both getter and setter). Shortcut
// @ to `process.env`.
exports.env = process.env

// @
// @ ### Pipes
// @
// @ Examples:
// @
// @ ```javascript
// @ grep('foo', 'file1.txt', 'file2.txt').sed(/o/g, 'a').to('output.txt');
// @ echo('files with o\'s in the name:\n' + ls().grep('o'));
// @ cat('test.js').exec('node'); // pipe to exec() call
// @ ```
// @
// @ Commands can send their output to another command in a pipe-like fashion.
// @ `sed`, `grep`, `cat`, `exec`, `to`, and `toEnd` can appear on the right-hand
// @ side of a pipe. Pipes can be chained.

// @
// @ ## Configuration
// @

exports.config = common.config

// @
// @ ### config.silent
// @
// @ Example:
// @
// @ ```javascript
// @ var sh = require('shelljs');
// @ var silentState = sh.config.silent; // save old silent state
// @ sh.config.silent = true;
// @ /* ... */
// @ sh.config.silent = silentState; // restore old silent state
// @ ```
// @
// @ Suppresses all command output if `true`, except for `echo()` calls.
// @ Default is `false`.

// @
// @ ### config.fatal
// @
// @ Example:
// @
// @ ```javascript
// @ require('./global');
// @ config.fatal = true; // or set('-e');
// @ cp('this_file_does_not_exist', '/dev/null'); // throws Error here
// @ /* more commands... */
// @ ```
// @
// @ If `true`, the script will throw a Javascript error when any shell.js
// @ command encounters an error. Default is `false`. This is analogous to
// @ Bash's `set -e`.

// @
// @ ### config.verbose
// @
// @ Example:
// @
// @ ```javascript
// @ config.verbose = true; // or set('-v');
// @ cd('dir/');
// @ rm('-rf', 'foo.txt', 'bar.txt');
// @ exec('echo hello');
// @ ```
// @
// @ Will print each command as follows:
// @
// @ ```
// @ cd dir/
// @ rm -rf foo.txt bar.txt
// @ exec echo hello
// @ ```

// @
// @ ### config.globOptions
// @
// @ Example:
// @
// @ ```javascript
// @ config.globOptions = {nodir: true};
// @ ```
// @
// @ Use this value for calls to `glob.sync()` instead of the default options.

// @
// @ ### config.reset()
// @
// @ Example:
// @
// @ ```javascript
// @ var shell = require('shelljs');
// @ // Make changes to shell.config, and do stuff...
// @ /* ... */
// @ shell.config.reset(); // reset to original state
// @ // Do more stuff, but with original settings
// @ /* ... */
// @ ```
// @
// @ Reset `shell.config` to the defaults:
// @
// @ ```javascript
// @ {
// @   fatal: false,
// @   globOptions: {},
// @   maxdepth: 255,
// @   noglob: false,
// @   silent: false,
// @   verbose: false,
// @ }
// @ ```
