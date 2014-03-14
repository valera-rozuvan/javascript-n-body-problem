/*global
    document: false, require: false
*/

/*jslint
    browser: false, white: false, indent: 4, maxlen: 120, nomen: true
*/

/*properties
    config, baseUrl, paths, jquery, mousetrap, noConflict, configConsoleLog, ready, onReadyCallback
*/

(function () {
    'use strict';

    /**
     * "Rules of Optimization:
     *     Rule 1: Don't do it.
     *     Rule 2 (for experts only): Don't do it yet.”
     *
     * ~ Michael A. Jackson
     */

    var modDeps,
        requireCallback;

    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min',
            mousetrap: 'vendor/mousetrap/mousetrap.min'
        }
    });

    requireCallback = function ($, util, app) {
        // Make jQuery play nice with other potential modules that use `window.$` global variable.
        $.noConflict();

        util.configConsoleLog(true);

        // When the DOM will be ready, start things.
        $(document).ready(app.onReadyCallback);
    };

    // Module dependencies.
    modDeps = ['jquery', 'util', 'app'];

    require(modDeps, requireCallback);
}());
