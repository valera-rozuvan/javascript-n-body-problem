/*global
    define: false, console: true
*/

/*jslint
    browser: false, white: false, indent: 4, maxlen: 120, nomen: true
*/

/*properties
    onReadyCallback, containerId, resize, attach, draw, clearCanvas, callbacks, vCanvas, configure, bind, onXKey, vIC,
    load, done, onVICDone, ctx, fillStyle, fillRect, width, height, draw2, putImageData, log, imageData, length,
    _attached, attach, _detached, detach, imgObj, get, addCallback, onClearCanvas, call
*/

(function () {
    'use strict';

    // Imported via a `require()` call.
    var VCanvas, VImgCollection, Mousetrap,

        modDeps, defineCallback,

        app = {};

    app.onReadyCallback = function () {
        var config = {
            containerId: 'canvas_container',
            resize: 'with_container',
            callbacks: {
                attach: [app.draw],
                clearCanvas: [app.draw]
            }
        };

        app.vCanvas = (new VCanvas(config))
            .configure()
            .attach();

        Mousetrap.bind('x', app.onXKey, 'keypress');

        app.vIC = (new VImgCollection())
            .load('boat', 'images/01.jpeg')
            .load('cat', 'images/02.jpeg')
            .load('horses', ['images/03.jpeg', 'images/04.jpeg'])
            .done(app.onVICDone);
    };

    app.draw = function () {
        this.ctx.fillStyle = 'rgb(200,0,0)';
        this.ctx.fillRect(10, 10, 40, 40);
        this.ctx.fillStyle = 'rgba(0,0,200,0.5)';
        this.ctx.fillRect(this.width - 50, this.height - 50, 40, 40);
    };

    app.draw2 = function (imgObj, dx, dy) {
        console.log('imgObj = ', imgObj);

        this.ctx.putImageData(imgObj.imageData, dx, dy);
    };

    app.onXKey = function (event, keyCombo) {
        console.log('[onXKey]: arguments.length = ', arguments.length);
        console.log('[onXKey]: arguments = ', arguments);

        console.log('event = ', event);
        console.log('keyCombo', keyCombo);

        if (app.vCanvas._attached === true) {
            app.vCanvas.detach();
        } else if (app.vCanvas._detached === true) {
            app.vCanvas.attach();
        } else {
            console.log('ERROR: Unknown attached state!');
        }
    };

    app.onVICDone = function () {
        app.imgObj = this.get('boat');

        app.vCanvas.addCallback('clearCanvas', app.onClearCanvas);

        app.draw2.call(app.vCanvas, app.imgObj, 80, 80);
    };

    app.onClearCanvas = function () {
        app.draw2.call(app.vCanvas, app.imgObj, 80, 80);
    };

    defineCallback = function (_VCanvas, _VImgCollection, _Mousetrap) {
        // Make imported modules available outside of this function's scope.
        VCanvas        = _VCanvas;
        VImgCollection = _VImgCollection;
        Mousetrap      = _Mousetrap;

        return app;
    };

    // Module dependencies.
    modDeps = ['v_canvas', 'v_img_collection', 'mousetrap'];

    define(modDeps, defineCallback);
}());
