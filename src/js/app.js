/*global
  define: false
*/

/*jslint
  browser: true, white: false, indent: 4, maxlen: 120, nomen: true, plusplus: false
*/

(function jsWrapper_app() {
  'use strict';

  var modDeps, modCallback,
    VCanvas, VImgCollection, Mousetrap, util,
    app;

  app = {};

  app.onReadyCallback = function onReadyCallback() {
    var config = {
      containerId: 'canvas_container',
      resize: 'with_container',
      callbacks: {
        attach: [app.draw],
        clearCanvas: [app.draw]
      }
    };

    app.enableLogs = true;

    app.vCanvas = (new VCanvas(config))
      .configure()
      .attach();

    Mousetrap.bind('x', app.onXKey, 'keypress');
    Mousetrap.bind('l', app.onLKey, 'keypress');

    app.vIC = (new VImgCollection())
      .load('boat', 'images/01.jpeg')
      .load('cat', 'images/02.jpeg')
      .load('horses', ['images/03.jpeg', 'images/04.jpeg'])
      .done(app.onVICDone);
  };

  app.draw = function draw() {
    this.ctx.fillStyle = 'rgb(200,0,0)';
    this.ctx.fillRect(10, 10, 40, 40);
    this.ctx.fillStyle = 'rgba(0,0,200,0.5)';
    this.ctx.fillRect(this.width - 50, this.height - 50, 40, 40);
  };

  app.draw2 = function draw2(imgObj, dx, dy) {
    console.log('imgObj = ', imgObj);

    this.ctx.putImageData(imgObj.imageData, dx, dy);
  };

  app.onXKey = function onXKey(event, keyCombo) {
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

  app.onLKey = function onLKey(event, keyCombo) {
    console.log('[onXKey]: arguments.length = ', arguments.length);
    console.log('[onXKey]: arguments = ', arguments);

    console.log('event = ', event);
    console.log('keyCombo', keyCombo);

    if (app.enableLogs) {
      app.enableLogs = false;
    } else {
      app.enableLogs = true;
    }

    util.configConsoleLog(app.enableLogs);
  };

  app.onVICDone = function onVICDone() {
    app.imgObj = this.get('boat');

    app.vCanvas.addCallback('clearCanvas', app.onClearCanvas);

    app.draw2.call(app.vCanvas, app.imgObj, 80, 80);
  };

  app.onClearCanvas = function onClearCanvas() {
    app.draw2.call(app.vCanvas, app.imgObj, 80, 80);
  };

  // Module dependencies.
  modDeps = ['v_canvas', 'v_img_collection', 'mousetrap', 'util'];

  // Module callback. It will run as soon as all module dependencies have been loaded.
  modCallback = function modCallback(_VCanvas, _VImgCollection, _Mousetrap, _util) {
    // Make dependencies visible outside of this function's scope.
    VCanvas = _VCanvas;
    VImgCollection = _VImgCollection;
    Mousetrap = _Mousetrap;
    util = _util;

    return app;
  };

  // Module initialization.
  define(modDeps, modCallback);
}).call(this);
