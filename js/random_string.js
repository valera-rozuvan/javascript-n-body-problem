/*global
    define: false
*/

/*jslint
    browser: true, white: false, indent: 4, maxlen: 120, nomen: true, plusplus: false
*/

(function jsWrapper_random_string() {
    'use strict';

    // Variables available within this closure.
    var modDeps, modCallback,
        randomString,
        _mask = '',
        _length = 16,
        _history = {};

    randomString = function randomString() {
        var result, i;

        do {
            result = '';

            // The magic that creates the random string of length
            // `_length`, containing symbols from `_mask`.
            for (i = _length; i > 0; i -= 1) {
                console.log('[randomString]: i = ', i);
                result += _mask[Math.round(Math.random() * (_mask.length - 1))];
            }
        } while (_history.hasOwnProperty(result));

        console.log('Adding "' + result + '" to _history store.');

        _history[result] = 1;

        return result;
    };

    // What characters do we want our random string to consist of?
    _mask += 'abcdefghijklmnopqrstuvwxyz';
    _mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Module dependencies.
    modDeps = [];

    // Module callback. It will run as soon as all module dependencies have been loaded.
    modCallback = function modCallback() {
        return randomString;
    };

    // Module initialization.
    define(modDeps, modCallback);
}());
