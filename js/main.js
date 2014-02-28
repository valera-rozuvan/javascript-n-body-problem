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
            jquery: 'vendor/jquery/jquery.min'
        }
    });

    require(['jquery', 'v_canvas'], function ($, VCanvas) {
        $.noConflict();

        $(document).ready(onReady);

        return;

        function onReady() {
            var config, vCanvas;

            config = {
                containerId: 'canvas_container',
                resize: 'with_container',
                callbacks: {
                    attach: [draw],
                    clearCanvas: [draw]
                }
            };
            vCanvas = new VCanvas(config);
            vCanvas.configure();
            vCanvas.attach();
        }

        function draw() {
            this.ctx.fillStyle = 'rgb(200,0,0)';
            this.ctx.fillRect(10, 10, 40, 40);
            this.ctx.fillStyle = 'rgba(0,0,200,0.5)';
            this.ctx.fillRect(this.width - 50, this.height - 50, 40, 40);
        }
    });
}).call(this);
