(function (window, undefined) {
    'use strict';

    // Our module.
    var randomString = function () {
            var result, i;

            do {
                result = '';

                // The magic that creates the random string of length
                // `_length`, containing symbols from `_mask`.
                for (i = _length; i > 0; --i) {
                    result += _mask[Math.round(Math.random() * (_mask.length - 1))];
                }
            } while (_history.hasOwnProperty(result));

            console.log('Adding "' + result + '" to _history store.');

            _history[result] = 1;

            return result;
        },

        // Variables available within this closure.
        _mask = '',
        _length = 16,
        _history = {};

    // What characters do we want our random string to consist of?
    _mask += 'abcdefghijklmnopqrstuvwxyz';
    _mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


    // Export the module.

    // Make the randomString module available via Require JS `define()` method.
    define(function () {
        return randomString;
    });
}).call(this, this);
