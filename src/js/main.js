/*global
  require: false
*/

/*jslint
  browser: true, white: false, indent: 4, maxlen: 120, nomen: true, plusplus: false
*/

(function jsWrapper_main() {
  'use strict';

  /**
   * "Rules of Optimization:
   *     Rule 1: Don't do it.
   *     Rule 2 (for experts only): Don't do it yet.”
   *
   * ~ Michael A. Jackson
   */

  var modDeps, modCallback,
    $, util, app;

  require.config({
    baseUrl: 'js',
    paths: {
      jquery: 'vendor/jquery/jquery.min',
      mousetrap: 'vendor/mousetrap/mousetrap.min'
    }
  });

  // Module dependencies.
  modDeps = ['jquery', 'util', 'app'];

  // Module callback. It will run as soon as all module dependencies have been loaded.
  modCallback = function modCallback(_$, _util, _app) {
    // Make dependencies visible outside of this function's scope.
    $ = _$;
    util = _util;
    app = _app;

    // Make jQuery play nice with other potential modules that use `window.$` global variable.
    $.noConflict();

    util.configConsoleLog(true);

    // When the DOM will be ready, start things.
    $(document).ready(app.onReadyCallback);
  };

  // Module initialization.
  require(modDeps, modCallback);
}).call(this);
