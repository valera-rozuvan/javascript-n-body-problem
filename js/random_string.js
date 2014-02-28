(function (undefined) {
    'use strict';

    define([], function () {
        var mask = '',
            length = 16;

        // What characters do we want our random string to consist of?
        mask += 'abcdefghijklmnopqrstuvwxyz';
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return function randomString() {
            var result = '',
                i;

            for (i = length; i > 0; --i) {
                result += mask[Math.round(Math.random() * (mask.length - 1))];
            }

            return result;
        };
    });
}());
