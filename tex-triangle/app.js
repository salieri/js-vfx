
require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [ 'Core/Color', 'Core/Point2D', 'Core/Draw', 'Core/Surface', 'Core/Point3D', 'Core/CanvasTexture', 'jquery', 'jqueryui' ],

	function( Color, Point2D, Draw, Surface, Point3D, CanvasTexture, $ )
	{
		var drawTriangle = function( radAdjustment, posX, posY, triangle, uv )
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

			Draw.texturedTriangle(
					translatedTriangle[ 0 ],
					translatedTriangle[ 1 ],
					translatedTriangle[ 2 ],
					uv[ 0 ],
					uv[ 1 ],
					uv[ 2 ],
					texture
				);
		};


		var drawAll = function( rad )
		{
			Draw.beginPaint();
				Draw.color.set( 32, 255, 32 );

				// rad = 0.76525;


				/* InterpolatedTriangle.draw(
						new Point2D( 320, 100 ),
						new Point2D( 220, 300 ),
						new Point2D( 420, 300 ),
						new Color( 255, 255, 255 ),
						new Color( 255, 0, 0 ),
						new Color( 0, 0, 0 )
					); */


				/* drawTriangle(
						rad, 160, 200,
						[ new Point2D( 0, -10 ), new Point2D( 100, 10 ), new Point2D( -10, 10 ) ],
						[ new Point3D( 1, 0, 0 ), new Point3D( 1, 1, 0 ), new Point3D( 0, 1, 0 ) ]
					); */



				var s = Math.cos( rad );

				//rad = 0.76525;
				//rad = 23.56;

				//rad = 44.8;
				//rad = 41.6;
				// s = 1;

				 drawTriangle(
						rad, 320, 300,
						[ new Point2D( s * 100, s * -100 ), new Point2D( s * 100, s * 100 ), new Point2D( s * -100, s * 100 ) ],
						[ new Point3D( 1, 0, 0 ), new Point3D( 1, 1, 0 ), new Point3D( 0, 1, 0 ) ]
					);


				drawTriangle(
						rad, 320, 150,
						[ new Point2D( s * 100, s * -100 ), new Point2D( s * 100, s * 100 ), new Point2D( s * -100, s * 100 ) ],
						[ new Point3D( 0.25, 0.75, 0 ), new Point3D( 0.5, 0.25, 0 ), new Point3D( 0.75, 0.75, 0 ) ]
						// [ new Point3D( 1, 0, 0 ), new Point3D( 1, 1, 0 ), new Point3D( 0, 1, 0 ) ]
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
		var texture;


		var init = function()
		{
			var surface		= new Surface( 'surface', false );

			Draw.setSurface( surface );
			Draw.bgColor.set( 220, 220, 220 );

			// drawAll( 0 );

			texture = new CanvasTexture( 'resources/smiley2.png' );

			texture.onload	= function()
			{
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
			};

			$( document ).on(
					'click',
					'#drawButton',
					function()
					{
						if( texture.loaded === true )
						{
							drawAll( 0 );
						}
					}
				);
		};


		init();
	} );
} );
