# debug-caller #

A wrapper around the [`debug`](https://github.com/visionmedia/debug) module,
providing the additional ability to determine the calling filename for `debug`,
using [`caller`](https://github.com/totherik/caller).

## Quick Examples ##

When you invoke `debug-caller`, you must specify the application name, and
can optionally specify the depth. If you do not specify the depth, it will
default to 1, using the immediate calling filename to build the decorator
for the `debug` instance. Below are some examples:

### Basic usage ###

```JavaScript
// foo.js

var debugCaller = require("debug-caller")("myApp");

debugCaller.log("logging data!");  // "myApp:foo logging data!"
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

logger.log("logging data!");  // "myOtherApp:bar logging data!"
```

## API ##

### log() ###

Uses the default `debug` logging (`console.log`) to output debug messages.

### error() ###

Binds the logging to `console.error` for the debug messages.
