# debug-caller #

[![Build Status](https://travis-ci.org/dylants/debug-caller.svg)](https://travis-ci.org/dylants/debug-caller) [![NPM version](https://badge.fury.io/js/debug-caller.svg)](http://badge.fury.io/js/debug-caller)

[![NPM](https://nodei.co/npm/debug-caller.svg?downloads=true)](https://nodei.co/npm/debug-caller/)

A wrapper around the [`debug`](https://github.com/visionmedia/debug) module,
providing the additional ability to determine the calling file name for `debug`,
using [`caller`](https://github.com/totherik/caller). Now you get unique namespaces
each time you use `debug`!

## Quick Examples ##

When you invoke `debug-caller`, you must specify the application name, and
can optionally specify the depth. If you do not specify the depth, it will
default to 1, using the immediate calling file name to build the decorator
for the `debug` instance. Below are some examples:

### Basic usage ###

```JavaScript
// foo.js

var logger = require("debug-caller")("myApp");

logger.log("logging data");  // "myApp:foo logging data"
```

### Used in a logging utility ###

```JavaScript
// logger.js

var debugCaller = require("debug-caller");

module.exports = function() {
    // set a depth of 2 to avoid using this file within debug statements
    // (since this is just a passthrough for logging)
    return debugCaller("myOtherApp", 2);
};
```

```JavaScript
// bar.js

var logger = require("./logger")();

logger.log("doing work");  // "myOtherApp:bar doing work"
```

## API ##

### log() ###

Uses the default `debug` logging (`console.log`) to output debug messages.

### error() ###

Binds the logging to `console.error` for the debug messages.

## Access Debug ##

If you need access to the `debug` module directly, it's available off the
require'd `debug-caller` object:

```JavaScript
var debugCaller = require("debug-caller");

// enable the app namespace debug output
debugCaller.debug.enable("myApp*");

// ...
```

## Etc ##

- Licence: [MIT](https://github.com/dylants/debug-caller/blob/master/LICENSE)
- Dependency Status: [![Dependency Status](https://david-dm.org/dylants/debug-caller.svg)](https://david-dm.org/dylants/debug-caller) 
