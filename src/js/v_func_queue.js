/*global
  define: false
*/

/*jslint
  browser: true, white: false, indent: 4, maxlen: 120, nomen: true, plusplus: false
*/

(function jsWrapper_v_func_queue() {
  'use strict';

  var modDeps, modCallback,
    $,
    VFuncQueue;

  VFuncQueue = function(config) {
    if (config === undefined || !$.isPlainObject(config)) {
      config = {};
    }
    this._config = config;

    if (typeof this._config.interval !== 'number') {
      this._config.interval = 50;
    }

    this._queue = [];
  };


  // Public methods.

  VFuncQueue.prototype.add = function(callback, scopeObj) {
    if (!$.isFunction(callback)) {
      console.log('ERROR: callback is not a function!');

      return;
    }

    if (scopeObj === undefined) {
      scopeObj = window;
    }

    this._queue.push({
      callback: callback,
      scopeObj: scopeObj
    });

    return this;
  };

  VFuncQueue.prototype.startProcessing = function() {
    this._processing = true;
    this._run();

    return this;
  };

  VFuncQueue.prototype.stopProcessing = function() {
    window.clearTimeout(this._processingTimeout);
    delete this._processing;

    return this;
  };

  VFuncQueue.prototype.clear = function() {
    delete this._queue;

    return this;
  };


  // Private methods.

  VFuncQueue.prototype._run = function() {
    var _this = this,
      qItem;

    while (this._processing === true && this._queue.length) {
      qItem = this._queue.pop();
      qItem.callback.call(qItem.scope);
    }

    this.processingTimeout = window.setTimeout(
      function() {
        _this._run();
      },
      this._config.interval
    );
  };

  // Module dependencies.
  modDeps = ['jquery'];

  // Module callback. It will run as soon as all module dependencies have been loaded.
  modCallback = function modCallback(_$) {
    // Make dependencies visible outside of this function's scope.
    $ = _$;

    return VFuncQueue;
  };

  // Module initialization.
  define(modDeps, modCallback);
}).call(this);
