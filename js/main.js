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

    require(['jquery'], function ($) {
        var width, height;

        $.noConflict();

        $(document).ready(onReady);

        return;

        function onReady() {
            onResize();

            window.addEventListener('deviceorientation', onResize);
            $(window).resize(onResize);

            setupCanvas();
            draw();
        }

        function onResize() {
            var $container = $('#canvas_container');

            width = $container.width();
            height = $container.height();

            if ($('#my_canvas').length) {
                clearCanvas();
                resizeCanvas();
                draw();
            }
        }

        function setupCanvas() {
            var $canvas, canvasEl;

            $canvas = $(
                '<canvas />',
                { 'id': 'my_canvas' }
            );

            canvasEl = $canvas[0];

            canvasEl.width = width;
            canvasEl.height = height;

            $('#canvas_container').append($canvas);

            console.log(canvasEl);

            draw();
        }

        function draw() {
            var $canvas = $('#my_canvas'),
                canvasEl, ctx;

            canvasEl = $canvas[0];

            if (!canvasEl.getContext) {
                return;
            }

            ctx = canvasEl.getContext('2d');

            ctx.fillStyle = 'rgb(200,0,0)';
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = 'rgba(0,0,200,0.5)';
            ctx.fillRect(width - 50, height - 50, 40, 40);
        }

        function clearCanvas() {
            var $canvas = $('#my_canvas'),
                canvasEl, ctx;

            canvasEl = $canvas[0];

            if (!canvasEl.getContext) {
                return;
            }

            ctx = canvasEl.getContext('2d');

            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        }

        function resizeCanvas() {
            var $canvas = $('#my_canvas'),
                canvasEl, ctx;

            canvasEl = $canvas[0];

            canvasEl.width = width;
            canvasEl.height = height;
        }
    });
}).call(this);
