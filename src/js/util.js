/*global
  define: false
*/

/*jslint
  browser: true, white: false, indent: 4, maxlen: 120, nomen: true, plusplus: false
*/

(function jsWrapper_util() {
  'use strict';

  var modDeps, modCallback,
    util;

  util = {};

  util.isFunction = function isFunction(func) {
    var getType = {},
      parent = func.constructor && func.constructor.prototype,
      getClass,
      hasProperty;

    getClass = getType.toString;
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

  util.emptyFunction = function emptyFunction() {
    return;
  };

  util._checkForConsoleLog = function _checkForConsoleLog() {
    // Support for browser's that don't have `window.console.log()` method.
    if (window.console === undefined) {
      window.console = {};
    }
    if (!util.isFunction(window.console.log)) {
      window.console.log = util.emptyFunction;
    }
  };

  util.configConsoleLog = function configConsoleLog(_enableConsoleLog) {
    // Make sure we actually have a `console.log()` to work with.
    util._checkForConsoleLog();

    if (_enableConsoleLog === true || _enableConsoleLog === false) {
      util.enableConsoleLog = _enableConsoleLog;
    } else {
      util.enableConsoleLog = true;
    }

    // Enable/disable output of debug information via the `window.console.log()` method. Store the actual `log()`
    // method in another variable for the case when you want to use the actual `log()` method from the browser's
    // JavaScript console.
    if (util.enableConsoleLog === false) {
      window.console.logOld = window.console.log;
      window.console.log = util.emptyFunction;
    } else if (util.isFunction(window.console.logOld)) {
      window.console.log = window.console.logOld;
    }
  };

  // Module dependencies.
  modDeps = [];

  // Module callback. It will run as soon as all module dependencies have been loaded.
  modCallback = function modCallback() {
    return util;
  };

  // Module initialization.
  define(modDeps, modCallback);
}).call(this);
