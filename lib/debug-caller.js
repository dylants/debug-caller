"use strict";

var debug = require("debug"),
    caller = require("caller"),
    path = require("path");

function _getDecorator(appName) {
    var callerFile;

    callerFile = caller();

    // if for some reason we're unable to determine the caller, use the appName only
    if (!callerFile) {
        return appName;
    }

    // TODO in later versions of Node (v0.12.+), there is simple `path.parse`
    // which will provide us with the file name property. But until most have
    // moved up to that version, find the caller file name in this way...

    // find the filename from the path
    callerFile = path.basename(callerFile);

    // strip off the suffix (if any)
    if (path.extname(callerFile)) {
        callerFile = callerFile.slice(0, callerFile.indexOf(path.extname(callerFile)));
    }

    return appName + ":" + callerFile;
}

function logger(appName) {
    var decorator, log, error;

    // get the filename which is used to decorate the debug module
    decorator = _getDecorator(appName);

    // setup two debug'ers, one for console.log and one for console.error
    log = debug(decorator);
    error = debug(decorator);
    error.log = console.error.bind(console);

    // return the two under the log and error functions
    return {
        log: log,
        error: error
    };
}
module.exports = logger;

// expose debug
logger.debug = debug;
