/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min',
            mousetrap: 'vendor/mousetrap/mousetrap.min'
        }
    });

    require(
        ['jquery', 'v_canvas', 'v_img_collection', 'mousetrap'],
        function ($, VCanvas, VImgCollection, Mousetrap)
    {
        $.noConflict();

        $(document).ready(onReady);

        return;

        function onReady() {
            var config, vCanvas, vIC;

            config = {
                containerId: 'canvas_container',
                resize: 'with_container',
                callbacks: {
                    attach: [draw],
                    clearCanvas: [draw]
                }
            };
            vCanvas = (new VCanvas(config))
                .configure()
                .attach();

            Mousetrap.bind('x', function () {
                if (vCanvas._attached === true) {
                    vCanvas.detach();
                } else if (vCanvas._detached === true) {
                    vCanvas.attach();
                } else {
                    console.log('ERROR: Unknown attached state!');
                }
            });

            vIC = (new VImgCollection())
                .load('boat', 'images/01.jpeg')
                .load('cat', 'images/02.jpeg')
                .load('horses', ['images/03.jpeg', 'images/04.jpeg'])
                .done(function () {
                    var imgObj = this.get('boat');

                    console.log('Done loading collection!');
                    console.log('collection = ', this._collection);


                    vCanvas.addCallback('clearCanvas', function () {
                        draw2.call(vCanvas, imgObj, 80, 80);
                    });

                    draw2.call(vCanvas, imgObj, 80, 80);
                });
        }

        function draw2(imgObj, dx, dy) {
            console.log('imgObj = ', imgObj);
            this.ctx.putImageData(imgObj.imageData, dx, dy);
        }

        function draw() {
            this.ctx.fillStyle = 'rgb(200,0,0)';
            this.ctx.fillRect(10, 10, 40, 40);
            this.ctx.fillStyle = 'rgba(0,0,200,0.5)';
            this.ctx.fillRect(this.width - 50, this.height - 50, 40, 40);
        }
    });
}).call(this);
