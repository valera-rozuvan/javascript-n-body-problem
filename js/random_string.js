(function (undefined) {
    'use strict';

    define(function () {
        var mask = '',
            length = 16,
            history = {};

        // What characters do we want our random string to consist of?
        mask += 'abcdefghijklmnopqrstuvwxyz';
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return function randomString() {
            var result, i;

            do {
                result = '';

                for (i = length; i > 0; --i) {
                    result += mask[Math.round(Math.random() * (mask.length - 1))];
                }
            } while (history.hasOwnProperty(result));

            history[result] = 1;

            return result;
        };
    });
}());
