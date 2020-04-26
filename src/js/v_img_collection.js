/*global
  define: false
*/

/*jslint
  browser: true, white: false, indent: 4, maxlen: 120, nomen: true, plusplus: false
*/

(function jsWrapper_v_img_collection() {
  'use strict';

  var modDeps;
  var modCallback;
  var $;
  var randomString;
  var VFuncQueue;
  var VCanvas;
  var VImgCollection;

  VImgCollection = function VImgCollection(config) {
    this._config = config;

    this._collection = {};
  };


  // Public methods.

  VImgCollection.prototype.load = function load(friendlyName, url) {
    var _this;

    if (this._doneLoading !== undefined) {
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

      $.each(url, function(index, url) {
        _this._addUrlToCollection(friendlyName, url);
      });
    } else {
      console.log('ERROR: url is not a string or an array!');

      return;
    }

    return this;
  };

  VImgCollection.prototype.done = function done(callback) {
    var collectionLength = 0;
    var _this = this;

    var vfq = (
      new VFuncQueue({
        interval: 20
      })
    ).startProcessing();

    var vc = (
      new VCanvas({
        inMemory: true,
        width: 10,
        height: 10,
        resize: 'manual'
      })
    ).configure();

    this._doneLoading = null;

    // Count total number of images.
    $.each(this._collection, function(friendlyName, imgSet) {
      $.each(imgSet, function(index, imgObj) {
        collectionLength += 1;
      });
    });

    $.each(this._collection, function(friendlyName, imgSet) {
      $.each(imgSet, function(index, imgObj) {
        imgObj.imgEl = new Image();
        imgObj.imgEl.addEventListener('load', function() {
          imgObj.width = this.width;
          imgObj.height = this.height;

          vfq.add(function() {
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

  VImgCollection.prototype.get = function get(friendlyName, index) {
    if (typeof index !== 'number') {
      index = 0;
    }

    return this._collection[friendlyName][0];
  };


  // Private methods.

  VImgCollection.prototype._addUrlToCollection = function _addUrlToCollection(friendlyName, url) {
    this._collection[friendlyName].push({
      id: randomString(),
      url: url
    });
  };

  // Module dependencies.
  modDeps = ['jquery', 'random_string', 'v_func_queue', 'v_canvas'];

  // Module callback. It will run as soon as all module dependencies have been loaded.
  modCallback = function modCallback(_$, _randomString, _VFuncQueue, _VCanvas) {
    // Make dependencies visible outside of this function's scope.
    $ = _$;
    randomString = _randomString;
    VFuncQueue = _VFuncQueue;
    VCanvas = _VCanvas;

    return VImgCollection;
  };

  // Module initialization.
  define(modDeps, modCallback);
}).call(this);
