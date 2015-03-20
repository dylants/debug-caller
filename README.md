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

var logger = require("debug-caller")("myApp");

logger.log("logging data");  // "myApp:foo:log logging data"
```

### Used in a logging utility ###

```javascript
// logger.js

var debugCaller = require("debug-caller");

module.exports = function() {
    // set a depth of 2 to avoid using this file within debug statements
    // (since this is just a passthrough for logging)
    return debugCaller("myOtherApp", 2);
};
```

```javascript
// bar.js

var logger = require("./logger")();

logger.log("doing work");  // "myOtherApp:bar:log doing work"
```

## API ##

As of version 2.x, `debug-caller` has wrapped
[`debug-logger`](https://github.com/appscot/debug-logger) instead of `debug`
directly. This was done to take advantage of the APIs that `debug-logger`
sets up automatically. These APIs are available from the `debug-caller`
instance:

* `trace` (logs to stdout)
* `debug` (logs to stdout)
* `log`   (logs to stdout)
* `info`  (logs to stdout)
* `warn`  (logs to stderr)
* `error` (logs to stderr)

For example, using the `logger` approach as written above:

```javascript
// logger.js

var debugCaller = require("debug-caller");

module.exports = function() {
    return debugCaller("awesome-app", 2);
};
```

```javascript
// baz.js

var logger = require("./logger")();

logger.log("message to stdout");  // "awesome-app:baz:log message to stdout"

logger.error("message to stderr");  // "awesome-app:baz:error message to stderr"
```

## Access Debug ##

If you need access to the `debug` module directly, it's available off the
require'd `debug-caller` object. For instance, to enable `debug` output within
your `logger` module:

```javascript
// logger.js

var debugCaller = require("debug-caller");

// enable debug output for our app
debugCaller.debug.enable("myApp*");

module.exports = function() {
    return debugCaller("myApp", 2);
};
```

## Etc ##

- Licence: [MIT](https://github.com/dylants/debug-caller/blob/master/LICENSE)
- Dependency Status: [![Dependency Status](https://david-dm.org/dylants/debug-caller.svg)](https://david-dm.org/dylants/debug-caller) 
