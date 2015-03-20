# debug-caller #

[![Build Status](https://travis-ci.org/dylants/debug-caller.svg)](https://travis-ci.org/dylants/debug-caller) [![NPM version](https://badge.fury.io/js/debug-caller.svg)](http://badge.fury.io/js/debug-caller)

[![NPM](https://nodei.co/npm/debug-caller.svg?downloads=true)](https://nodei.co/npm/debug-caller/)

A wrapper around the [`debug`](https://github.com/visionmedia/debug) module,
providing the additional ability to determine the calling file name for `debug`'s
namespace using [`caller`](https://github.com/totherik/caller). Get automatic
unique namespaces each time you use `debug`!

## Quick Examples ##

When you invoke `debug-caller`, you must specify the application name, and
can optionally specify the depth. If you do not specify the depth, it will
default to 1, using the immediate calling file name to build the namespace
for the `debug` instance. Below are some examples:

### Basic usage ###

```javascript
// foo.js

var logger = require("debug-caller")("my-app");

logger.log("logging data");  // "my-app:foo logging data"
```

### Used in a logging utility ###

```javascript
// logger.js

var debugCaller = require("debug-caller");

module.exports = function() {
    // set a depth of 2 to avoid using this file within debug statements
    // (since this is just a passthrough for logging)
    return debugCaller("my-app", 2);
};
```

```javascript
// bar.js

var logger = require("./logger")();

logger.log("doing work");  // "my-app:bar doing work"

logger.error("something went wrong!");  // "my-app:bar something went wrong!"
```

## API ##

The `debug-caller` module provides two separate instances of `debug` using
the same namespace for each. The purpose is to provide the user a function
to use for console.log (stdout) and console.error (stderr).

### log() ###

Binds the logging to `console.log` (stdout) for the debug messages.

### error() ###

Binds the logging to `console.error` (stderr) for the debug messages.

## Access Debug ##

If you need access to the `debug` module directly, it's available off the
require'd `debug-caller` object. For instance, to enable `debug` output by default
within your application, you can enable it within your `logger` module:

```javascript
// logger.js

var debugCaller = require("debug-caller");

// enable debug output for our app
debugCaller.debug.enable("my-app*");

module.exports = function() {
    // set a depth of 2 to avoid using this file within debug statements
    // (since this is just a passthrough for logging)
    return debugCaller("my-app", 2);
};
```

## Etc ##

- Licence: [MIT](https://github.com/dylants/debug-caller/blob/master/LICENSE)
- Dependency Status: [![Dependency Status](https://david-dm.org/dylants/debug-caller.svg)](https://david-dm.org/dylants/debug-caller) 
