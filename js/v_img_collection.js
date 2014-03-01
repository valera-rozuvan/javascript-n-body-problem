(function (undefined) {
    'use strict';

    define(
        ['jquery', 'random_string', 'v_func_queue', 'v_canvas'],
        function ($, randomString, VFuncQueue, VCanvas)
    {

    var VImgCollection = function (config) {
        this._config = config;

        this._collection = {};
    };


    // Public methods.

    VImgCollection.prototype.load = function (friendlyName, url) {
        var _this;

        if (typeof this._doneLoading !== 'undefined') {
            console.log('ERROR: done() method for this collection already called!');

            return;
        }

        if (this._collection.hasOwnProperty(friendlyName)) {
            console.log(
                'ERROR: The collection already has an entry with friendlyName = "' +
                friendlyName +
                '"!'
            );

            return;
        }

        this._collection[friendlyName] = [

        ];

        if (typeof url === 'string') {
            this._addUrlToCollection(friendlyName, url);
        } else if ($.isArray(url)) {
            _this = this;

            $.each(url, function (index, url) {
                _this._addUrlToCollection(friendlyName, url);
            });
        } else {
            console.log('ERROR: url is not a string or an array!');

            return;
        }

        return this;
    };

    VImgCollection.prototype.done = function (callback) {
        var collectionLength = 0,
            _this = this,
            vfq = (new VFuncQueue({
                interval: 20
            })).startProcessing(),
            vc = (new VCanvas({
                inMemory: true,
                width: 10,
                height: 10,
                resize: 'manual'
            })).configure();

        this._doneLoading = null;

        // Count total number of images.
        $.each(this._collection, function (friendlyName, imgSet) {
            $.each(imgSet, function (index, imgObj) {
                collectionLength += 1;
            });
        });

        $.each(this._collection, function (friendlyName, imgSet) {
            $.each(imgSet, function (index, imgObj) {
                imgObj.imgEl = new Image();
                imgObj.imgEl.addEventListener('load', function () {
                    imgObj.width = this.width;
                    imgObj.height = this.height;

                    vfq.add(function () {
                        collectionLength -= 1;

                        vc.width = imgObj.width;
                        vc.height = imgObj.height;

                        vc.resizeCanvas();
                        vc.clearCanvas();

                        vc.ctx.drawImage(imgObj.imgEl, 0, 0);

                        imgObj.imageData = vc.ctx.getImageData(0, 0, vc.width, vc.height);
                        imgObj.rawData = imgObj.imageData.data;

                        if (collectionLength === 0) {
                            vfq.stopProcessing();
                            vfq.clear();

                            callback.call(_this);
                        }
                    });
                });
                imgObj.imgEl.src = imgObj.url;
            });
        });

        this._doneLoading = true;

        return this;
    };

    VImgCollection.prototype.get = function (friendlyName, index) {
        if (typeof index !== 'number') {
            index = 0;
        }

        return this._collection[friendlyName][0];
    };


    // Private methods.

    VImgCollection.prototype._addUrlToCollection = function (friendlyName, url) {
        this._collection[friendlyName].push({
            id: randomString(),
            url: url
        });
    };

    return VImgCollection;

    });
}());
