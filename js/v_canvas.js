/*global
    define: false, console: false, window: false
*/

/*jslint
    browser: false, white: false, indent: 4, maxlen: 120, nomen: true
*/

/*properties
    $canvas, $container, _attached, _callCallbacks, _configureCallbacks,
    _configureCanvas, _configureContainer, _configureResizing, _configured,
    _detached, _onResize, addCallback, addEventListener, append, apply, attach,
    call, callbacks, canvasEl, clearCanvas, clearRect, cofig, config, configure,
    containerEl, containerId, ctx, detach, each, getContext, hasOwnProperty,
    height, id, isArray, isFunction, log, memoryOnly, prototype, push, resize,
    resizeCanvas, width
*/

(function () {
    'use strict';

    // Imported via a `define()` call.
    var $, randomString,

        // Our module.
        VCanvas = function (config) {
            this.config = config;
        },

        // Module dependencies.
        modDeps = ['jquery', 'random_string'];


    // Public methods.

    VCanvas.prototype.configure = function (callback) {
        if (this._configured !== undefined) {
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

        return this;
    };

    VCanvas.prototype.attach = function (callback) {
        if (this.config.memoryOnly === true) {
            console.log('ERROR: memory only - can\'t attach to container!');

            return;
        }

        if (this._attached !== undefined) {
            console.log('ERROR: attach() method was already invoked!');

            return;
        }

        this._attached = null;
        this.$container.append(this.$canvas);
        this._attached = true;

        // Now can detach again.
        delete this._detached;

        this._callCallbacks('attach', callback);

        return this;
    };

    VCanvas.prototype.detach = function (callback) {
        if (this.config.memoryOnly === true) {
            console.log('ERROR: memory only - can\'t detach from container!');

            return;
        }

        if (this._detached !== undefined) {
            console.log('ERROR: detach() method was already invoked!');

            return;
        }

        this._detached = null;
        this.$canvas.detach();
        this._detached = true;

        // Now can attach again.
        delete this._attached;

        this._callCallbacks('detach', callback);

        return this;
    };

    VCanvas.prototype.clearCanvas = function (callback) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this._callCallbacks('clearCanvas', callback);

        return this;
    };

    VCanvas.prototype.resizeCanvas = function (callback) {
        if (this.config.resize === 'never') {
            console.log('ERROR: config.resize is set to "never"!');

            return;
        }

        this.canvasEl.width = this.width;
        this.canvasEl.height = this.height;

        this._callCallbacks('resizeCanvas', callback);

        return this;
    };

    VCanvas.prototype.addCallback = function (methodName, callback) {
        if (!this.callbacks.hasOwnProperty(methodName)) {
            console.log('ERROR: Trying to add callback for non-existent method "' + methodName + '".');

            return;
        }

        this.callbacks[methodName].push(callback);

        return this;
    };


    // Private methods.

    VCanvas.prototype._onResize = function () {
        this.width = this.$container.width();
        this.height = this.$container.height();

        this.resizeCanvas();
        this.clearCanvas();
    };

    VCanvas.prototype._configureContainer = function () {
        if (this.config.memoryOnly === true) {
            return;
        }

        if (!this.config.containerId) {
            this.config.containerId = 'body';
        } else {
            this.config.containerId = '#' + this.config.containerId;
        }
        this.$container = $(this.config.containerId);
        this.containerEl = this.$container[0];

        this.width = this.$container.width();
        this.height = this.$container.height();
    };

    VCanvas.prototype._configureCanvas = function () {
        this.id = randomString();
        this.$canvas = $(
            '<canvas />',
            {
                id: this.id
            }
        );
        this.canvasEl = this.$canvas[0];

        if (this.config.memoryOnly === true) {
            if (typeof this.config.width === 'number') {
                this.canvasEl.width = this.cofig.width;
            } else {
                this.canvasEl.width = 200;
            }

            if (typeof this.config.height === 'number') {
                this.canvasEl.height = this.cofig.height;
            } else {
                this.canvasEl.height = 200;
            }
        } else {
            this.canvasEl.width = this.width;
            this.canvasEl.height = this.height;
        }

        if (!this.canvasEl.getContext) {
            console.log('ERROR: getContext() method is not supported!');

            return;
        }

        this.ctx = this.canvasEl.getContext('2d');
    };

    VCanvas.prototype._configureResizing = function () {
        var _this = this;

        if (this.config.memoryOnly === true || this.config.resize === 'manual') {
            this.config.resize = 'manual';
        } else if (
            !this.config.resize ||
                (
                    this.config.resize !== 'with_container' && this.config.resize !== 'never'
                )
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
            clearCanvas: [],
            resizeCanvas: []
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


    // Export the module.

    // Make the VCanvas module available via Require JS `define()` method.
    // Require VCanvas module dependencies.
    define(modDeps, function (_$, _randomString) {
        $            = _$;
        randomString = _randomString;

        return VCanvas;
    });
}());
