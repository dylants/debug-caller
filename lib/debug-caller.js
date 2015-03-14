"use strict";

var debug = require("debug"),
    caller = require("caller"),
    path = require("path");

/**
 * Returns the descriptive text used in the debug instantiation, which at this
 * point is the app + calling filename. Allow the user to specify a depth for the
 * calling filename, in the case they have a wrapping function calling this.
 *
 * @param  {String} appName The application name, used in the decorator
 * @param  {Number} depth   Optional: Depth used to determine caller filename
 *                          (defaults to 2)
 * @return {String}         The app + calling filename
 */
function _getDecorator(appName, depth) {
    var callerFile;

    // Our default depth needs to be 2, since 1 is this file. If the user
    // specifies their own depth, add it to 1 (for this file) since they
    // assume the default depth is 1 (which added together, would be 2).
    callerFile = caller(depth ? depth + 1 : 2);

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

/**
 * Creates the `debug` object using the decorator built from the `appName`
 * and calling filename. Creates 2 loggers, one for log, one for error.
 *
 * @param  {String} appName The application name, used in the decorator
 * @param  {Number} depth   Optional: Depth used to determine caller filename
 *
 * @return {Object}         An object with two loggers: log and error
 */
function logger(appName, depth) {
    var decorator, log, error;

    // Get the filename which is used to decorate the debug module.
    // To avoid confusion, send in whatever the user supplied for depth
    // and allow the _getDecorator function to determine defaults...
    decorator = _getDecorator(appName, depth);

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

// expose debug to the consumer
logger.debug = debug;
