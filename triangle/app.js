
require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [ 'Core/Color', 'Core/Point2D', 'Core/Draw', 'Core/Surface', 'jquery', 'jqueryui' ],

	function( Color, Point2D, Draw, Surface, $ )
	{
		var drawTriangles = function( radAdjustment, posY, triangle )
		{
			var triCount			= 10;
			var translatedTriangle	= [ new Point2D(), new Point2D(), new Point2D() ];

			var pixelColor			= new Color(   255, 0, 0, 128 );

			for( var i = 0; i < triCount; i++ )
			{
				var rad		= i * ( Math.PI * 2 ) / triCount + radAdjustment;
				var posX	= ( Draw.surface.getWidth() / triCount ) * ( i + 0.5 );
				var j;

				for( j = 0; j < 3; j++ )
				{
					translatedTriangle[ j ].x =
							posX +
							triangle[ j ].x * Math.cos( rad ) - triangle[ j ].y * Math.sin( rad );

					translatedTriangle[ j ].y =
							posY +
							triangle[ j ].y * Math.cos( rad ) + triangle[ j ].x * Math.sin( rad );
				}

				Draw.triangle(
						translatedTriangle[ 0 ],
						translatedTriangle[ 1 ],
						translatedTriangle[ 2 ],
						Draw.color
					);


				for( j = 0; j < 3; j++ )
				{
					Draw.blendPixel( translatedTriangle[ j ], pixelColor );
				}
			}
		};


		var drawAll = function( rad )
		{
			Draw.beginPaint();
				Draw.color.set( 32, 255, 32 );

	/*			Draw.triangle( new Point2D( 0, -100 ), new Point2D( 100, 100 ), new Point2D( -100, 100 ), Draw.color );
				Draw.triangle( new Point2D( 0, 380 ), new Point2D( 100, 580 ), new Point2D( -100, 580 ), Draw.color );

				Draw.triangle( new Point2D( 630, -100 ), new Point2D( 740, 100 ), new Point2D( 540, 100 ), Draw.color );
				Draw.triangle( new Point2D( 630, 380 ), new Point2D( 740, 580 ), new Point2D( 540, 580 ), Draw.color );
	*/
				Draw.color.set( 32, 32, 255 );
				drawTriangles( rad, 150, [ new Point2D( 0, -10 ), new Point2D( -10, 10 ), new Point2D( 10, 0 ) ] );
				drawTriangles( rad, 200, [ new Point2D( 0, -8 ), new Point2D( 7, 4 ), new Point2D( 10, 0 ) ] );
				drawTriangles( rad, 250, [ new Point2D( 0, -10 ), new Point2D( -30, 10 ), new Point2D( 30, 35 ) ] );
			Draw.endPaint();
		};



		var startTime	= new Date();

		var init = function()
		{
			var surface		= new Surface( 'surface', false );

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
