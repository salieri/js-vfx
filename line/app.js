
require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [ 'Core/Color', 'Core/Point2D', 'Core/Draw', 'Core/Line', 'Core/Surface', 'jquery', 'jqueryui' ],

	function( Color, Point2D, Draw, Line, Surface, $ )
	{
		var drawLine = function( p1, p2, rad ) // jshint ignore:line
		{
			var lineColor	= new Color( 32, 255, 32 );
			var pixelColor	= new Color(   255, 0, 0, 128 );

			Line.draw( p1, p2, lineColor, Draw.getSurface() );
			Draw.blendPixel( p1, pixelColor );
			Draw.blendPixel( p2, pixelColor );
		};


		/**
		 * @param {float|int|Number} x
		 * @param {float|int|Number} y
		 * @param {float|int|Number} length
		 * @param {float|int|Number} rad
		 */
		var rotateLine = function( x, y, length, rad )
		{
			var lineColor	= new Color( 32, 255, 32 );
			var pixelColor	= new Color(   255, 0, 0, 128 );

			var lx1 = -length / 2;
			var lx2 = length / 2;
			var ly1 = 0;
			var ly2 = 0;

			var p1 = new Point2D(
					x + lx1 * Math.cos( rad ) - ly1 * Math.sin( rad ),
					y + ly1 * Math.cos( rad ) + lx1 * Math.sin( rad )
				);

			var p2 = new Point2D(
					x + lx2 * Math.cos( rad ) - ly2 * Math.sin( rad ),
					y + ly2 * Math.cos( rad ) + lx2 * Math.sin( rad )
				);

			Line.draw( p1, p2, lineColor, Draw.getSurface() );

			Draw.blendPixel( p1, pixelColor );
			Draw.blendPixel( p2, pixelColor );
		};


		var drawAll = function( rad )
		{
			Draw.beginPaint();

				rotateLine( 320, 240, 100, rad );

				/*drawLine( new Point2D( 10, 20 ), new Point2D( 30, 40 ) );

				drawLine( new Point2D( 200, 200 ), new Point2D( 500, 200 ) );
				drawLine( new Point2D( 200, 300 ), new Point2D( 500, 300 ) );
				drawLine( new Point2D( 200, 200 ), new Point2D( 200, 300 ) );
				drawLine( new Point2D( 500, 200 ), new Point2D( 500, 300 ) );

				drawLine( new Point2D( 200, 200 ), new Point2D( 500, 300 ) );
				drawLine( new Point2D( 500, 200 ), new Point2D( 200, 300 ) );

				drawLine( new Point2D( 500, 450 ), new Point2D( 200, 449 ) );
				drawLine( new Point2D( 600, 100 ), new Point2D( 601, 400 ) );*/
			Draw.endPaint();
		};


		var surface;
		var startTime	= new Date();


		var init = function()
		{
			surface		= new Surface( 'surface', false );

			Draw.setSurface( surface );
			Draw.bgColor.set( 220, 220, 220 );

			drawAll( 0 );


			setInterval(
					function()
					{
						if( surface.isDrawing() === false )
						{
							var curTime	= new Date();
							var rad		= ( curTime.getTime() - startTime.getTime() ) / 1000;

							drawAll( rad );
						}
					},
					25
				);


			$( document ).on(
					'click',
					'#drawButton',
					function()
					{
						drawAll( 0 );
					}
				);
		};


		init();
	} );
} );
