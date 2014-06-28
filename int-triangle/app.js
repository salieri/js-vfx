
require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [ 'Core/Color', 'Core/Point2D', 'Core/Draw', 'Core/Surface', 'jquery', 'jqueryui' ],

	function( Color, Point2D, Draw, Surface, $ )
	{
		var drawTriangle = function( radAdjustment, posX, posY, triangle )
		{
			var translatedTriangle	= [ new Point2D(), new Point2D(), new Point2D() ];
			var rad					= radAdjustment;

			for( var j = 0; j < 3; j++ )
			{
				translatedTriangle[ j ].x =
						posX +
						triangle[ j ].x * Math.cos( rad ) - triangle[ j ].y * Math.sin( rad );

				translatedTriangle[ j ].y =
						posY +
						triangle[ j ].y * Math.cos( rad ) + triangle[ j ].x * Math.sin( rad );
			}

			Draw.interpolatedTriangle(
					translatedTriangle[ 0 ],
					translatedTriangle[ 1 ],
					translatedTriangle[ 2 ],
					new Color( 255, 255, 255 ),
					new Color( 255, 0, 0 ),
					new Color( 0, 0, 0 )
				);
		};


		var drawAll = function( rad )
		{
			Draw.beginPaint();
				Draw.color.set( 32, 255, 32 );

				/* InterpolatedTriangle.draw(
						new Point2D( 320, 100 ),
						new Point2D( 220, 300 ),
						new Point2D( 420, 300 ),
						new Color( 255, 255, 255 ),
						new Color( 255, 0, 0 ),
						new Color( 0, 0, 0 )
					); */


				drawTriangle(
						// 77.458
						 rad // jshint ignore:line
						// 61.758
						// 36.231
						// 9.2
						// 91.503
						//  /*1.108*/, 320, 240,
						, 320, 240, // jshint ignore:line
						[ new Point2D( 0, -100 ), new Point2D( -100, 100 ), new Point2D( 100, 100 ) ]
					);

	/*			Triangle.draw( new Point2D( 0, -100 ), new Point2D( 100, 100 ), new Point2D( -100, 100 ) );
				Triangle.draw( new Point2D( 0, 380 ), new Point2D( 100, 580 ), new Point2D( -100, 580 ) );

				Triangle.draw( new Point2D( 630, -100 ), new Point2D( 740, 100 ), new Point2D( 540, 100 ) );
				Triangle.draw( new Point2D( 630, 380 ), new Point2D( 740, 580 ), new Point2D( 540, 580 ) );

				Draw.color.set( 32, 32, 255 );
				drawTriangles( rad, 150, [ new Point2D( 0, -10 ), new Point2D( -10, 10 ), new Point2D( 10, 0 ) ] );
				drawTriangles( rad, 200, [ new Point2D( 0, -8 ), new Point2D( 7, 4 ), new Point2D( 10, 0 ) ] );
				drawTriangles( rad, 250, [ new Point2D( 0, -10 ), new Point2D( -30, 10 ), new Point2D( 30, 35 ) ] );*/
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
