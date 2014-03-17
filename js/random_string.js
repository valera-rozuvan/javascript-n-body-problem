/*global
    define: false, console: true
*/

/*jslint
    browser: false, white: false, indent: 4, maxlen: 120, nomen: true, plusplus: false
*/

/*properties
    length, random, round, hasOwnProperty, log
*/

(function () {
    'use strict';

    // Variables available within this closure.
    var _mask = '',
        _length = 16,
        _history = {},

        modDeps,
        defineCallback,

        // Our module.
        randomString = function () {
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

    defineCallback = function () {
        return randomString;
    };

    // Module dependencies.
    modDeps = [];

    define(modDeps, defineCallback);
}());
