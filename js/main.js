(function (window, undefined) {
    'use strict';

    /**
     * "Rules of Optimization:
     *     Rule 1: Don't do it.
     *     Rule 2 (for experts only): Don't do it yet.”
     *
     * ~ Michael A. Jackson
     */

    // Imported via a `require()` call.
    var $, VCanvas, VImgCollection, Mousetrap,

        // Module dependencies.
        modDeps = ['jquery', 'v_canvas', 'v_img_collection', 'mousetrap'],

        _enableConsoleLog = true,

        _vCanvas, _vIC, _imgObj;

    // Support for browser's that don't have `window.console.log()` method.
    if (typeof window.console === 'undefined') {
        window.console = {};
    }
    if (!_isFunction(window.console.log)) {
        window.console.log = _emptyFunction;
    }

    // Enable/disable output of debug information via the
    // `window.console.log()` method. Store the actual
    // `log()` method in another variable for the case when
    // you want to use the actual `log()` method from the
    // browser's JavaScript console.
    if (_enableConsoleLog === false) {
        window.console.logOld = window.console.log;
        window.console.log = _emptyFunction;
    }

    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min',
            mousetrap: 'vendor/mousetrap/mousetrap.min'
        }
    });

    require(modDeps, _requireCallback);

    return;


    // Private methods.

    function _requireCallback() {
        // Make imported modules available outside of this function's scope.
        $              = arguments[0];
        VCanvas        = arguments[1];
        VImgCollection = arguments[2];
        Mousetrap      = arguments[3];

        // Make jQuery play nice with other potential modules
        // that use `window.$` global variable.
        $.noConflict();

        // When the DOM will be ready, start things.
        $(document).ready(_onReady);
    }

    function _onXKey(event, keyCombo) {
        console.log('[_onXKey]: arguments.length = ', arguments.length);
        console.log('[_onXKey]: arguments = ', arguments);

        console.log('event = ', event);
        console.log('keyCombo', keyCombo);

        if (_vCanvas._attached === true) {
            _vCanvas.detach();
        } else if (_vCanvas._detached === true) {
            _vCanvas.attach();
        } else {
            console.log('ERROR: Unknown attached state!');
        }
    }

    function _onClearCanvas() {
        _draw2.call(_vCanvas, _imgObj, 80, 80);
    }

    function _onVICDone() {
        _imgObj = this.get('boat');

        _vCanvas.addCallback('clearCanvas', _onClearCanvas);

        _draw2.call(_vCanvas, _imgObj, 80, 80);
    }

    function _onReady() {
        var config = {
            containerId: 'canvas_container',
            resize: 'with_container',
            callbacks: {
                attach: [_draw],
                clearCanvas: [_draw]
            }
        };

        _vCanvas = (new VCanvas(config))
            .configure()
            .attach();

        Mousetrap.bind('x', _onXKey, 'keypress');

        _vIC = (new VImgCollection())
            .load('boat', 'images/01.jpeg')
            .load('cat', 'images/02.jpeg')
            .load('horses', ['images/03.jpeg', 'images/04.jpeg'])
            .done(_onVICDone);
    }

    function _draw2(imgObj, dx, dy) {
        console.log('imgObj = ', imgObj);

        this.ctx.putImageData(imgObj.imageData, dx, dy);
    }

    function _draw() {
        this.ctx.fillStyle = 'rgb(200,0,0)';
        this.ctx.fillRect(10, 10, 40, 40);
        this.ctx.fillStyle = 'rgba(0,0,200,0.5)';
        this.ctx.fillRect(this.width - 50, this.height - 50, 40, 40);
    }

    function _isFunction(func) {
        var getType = {},
            parent = func.constructor &&
                func.constructor.prototype,
            getClass, hasProperty;

        getClass    = getType.toString,
        hasProperty = getType.hasOwnProperty;

        if (typeof func !== 'function') {
            return false;
        }

        if (getClass.call(func) !== '[object Function]') {
            return false;
        }

        if (hasProperty.call(parent, 'call') === false) {
            return false;
        }

        return true;
    }

    function _emptyFunction () {}
}).call(this, this);
