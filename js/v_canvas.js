(function (undefined) {
    'use strict';

    define(['jquery', 'random_string'], function ($, randomString) {
        var VCanvas = function (config) {
            this.config = config;
        };


        // Public methods.

        VCanvas.prototype.configure = function (callback) {
            if (typeof this._configured !== 'undefined') {
                console.log('ERROR: configure() method was already invoked!');

                return;
            }

            this._configured = null;

            this._configureContainer();
            this._configureCanvas();
            this._configureResizing();
            this._configureCallbacks();

            this._configured = true;

            this._callCallbacks('configure', callback);
        };

        VCanvas.prototype.attach = function (callback) {
            if (typeof this._attached !== 'undefined') {
                console.log('ERROR: attach() method was already invoked!');

                return;
            }

            this._attached = null;
            this.$container.append(this.$canvas);
            this._attached = true;

            // Now can dettach again.
            delete this._detached;

            this._callCallbacks('attach', callback);
        };

        VCanvas.prototype.detach = function (callback) {
            if (typeof this._detached !== 'undefined') {
                console.log('ERROR: detach() method was already invoked!');

                return;
            }

            this._detached = null;
            this.$container.detach();
            this._detached = true;

            // Now can attach again.
            delete this._attached;

            this._callCallbacks('detach', callback);
        };

        VCanvas.prototype.clearCanvas = function (callback) {
            this.ctx.clearRect(0, 0, this.width, this.height);

            this._callCallbacks('clearCanvas', callback);
        };


        // Private methods.

        VCanvas.prototype._onResize = function () {
            this.width = this.$container.width();
            this.height = this.$container.height();

            this._resizeCanvas();
            this.clearCanvas();
        };

        VCanvas.prototype._resizeCanvas = function () {
            this.canvasEl.width = this.width;
            this.canvasEl.height = this.height;
        };

        VCanvas.prototype._configureContainer = function () {
            if (!this.config.containerId) {
                this.config.containerId = 'body';
            } else {
                this.config.containerId = '#' + this.config.containerId;
            }
            this.$container = $(this.config.containerId)
            this.containerEl = this.$container[0];

            this.width = this.$container.width();
            this.height = this.$container.height();
        };

        VCanvas.prototype._configureCanvas = function () {
            this.id = randomString();
            this.$canvas = $(
                '<canvas />',
                {
                    'id': this.id
                }
            );
            this.canvasEl = this.$canvas[0];

            this.canvasEl.width = this.width;
            this.canvasEl.height = this.height;

            if (!this.canvasEl.getContext) {
                console.log('ERROR: getContext() method is not supported!');

                return;
            }

            this.ctx = this.canvasEl.getContext('2d');
        };

        VCanvas.prototype._configureResizing = function () {
            var _this = this;

            if (
                !this.config.resize ||
                (this.config.resize !== 'with_container' && this.config.resize !== 'never')
            ) {
                this.config.resize = 'never';
            }

            if (this.config.resize === 'with_container') {
                window.addEventListener('deviceorientation', function () {
                    _this._onResize.apply(_this, arguments);
                });
                $(window).resize(function () {
                    _this._onResize.apply(_this, arguments);
                });
            }
        };

        VCanvas.prototype._configureCallbacks = function () {
            var _this = this;

            this.callbacks = {
                configure: [],
                attach: [],
                detach: [],
                clearCanvas: []
            };

            if (!this.config.callbacks) {
                return;
            }

            $.each(this.config.callbacks, function (callbackName, callbacks) {
                if (_this.callbacks.hasOwnProperty(callbackName)) {
                    if ($.isArray(callbacks)) {
                        _this.callbacks[callbackName] = callbacks;
                    }
                }
            });
        };

        VCanvas.prototype._callCallbacks = function (methodName, callback) {
            var _this = this;

            $.each(this.callbacks[methodName], function (index, callback) {
                callback.call(_this);
            });

            if ($.isFunction(callback)) {
                callback.call(this);
            }
        };


        // Export the VCanvas module.

        return VCanvas;
    });
}());
