/*global
    window: false, define: false, console: true
*/

/*jslint
    browser: false, white: false, indent: 4, maxlen: 120, nomen: true
*/

/*properties
    isFunction, toString, hasOwnProperty, call, prototype, constructor, emptyFunction, checkForConsoleLog,
    _checkForConsoleLog, console, isFunction, log, configConsoleLog, enableConsoleLog, logOld
*/

(function () {
    'use strict';

    // Imported via a `require()` call.
    var modDeps,
        defineCallback,
        util = {};

    util.isFunction = function (func) {
        var getType = {},
            parent = func.constructor && func.constructor.prototype,
            getClass,
            hasProperty;

        getClass    = getType.toString;
        hasProperty = getType.hasOwnProperty;

        if (typeof func !== 'function') {
            return false;
        }

        if (getClass.call(func) !== '[object Function]') {
            return false;
        }

        if (hasProperty.call(parent, 'call') === false) {
            return false;
        }

        return true;
    };

    util.emptyFunction = function () {
        return;
    };

    util._checkForConsoleLog = function () {
        // Support for browser's that don't have `window.console.log()` method.
        if (window.console === undefined) {
            window.console = {};
        }
        if (!util.isFunction(window.console.log)) {
            window.console.log = util.emptyFunction;
        }
    };

    util.configConsoleLog = function (_enableConsoleLog) {
        // Make sure we actually have a `console.log()` to work with.
        util._checkForConsoleLog();

        if (_enableConsoleLog === true || _enableConsoleLog === false) {
            util.enableConsoleLog = _enableConsoleLog;
        } else if (util.enableConsoleLog !== true && util.enableConsoleLog !== false) {
            util.enableConsoleLog = true;
        }

        // Enable/disable output of debug information via the `window.console.log()` method. Store the actual `log()`
        // method in another variable for the case when you want to use the actual `log()` method from the browser's
        // JavaScript console.
        if (util.enableConsoleLog === false) {
            window.console.logOld = window.console.log;
            window.console.log = util.emptyFunction;
        }
    };

    defineCallback = function () {
        return util;
    };

    // Module dependencies.
    modDeps = [];

    define(modDeps, defineCallback);
}());
