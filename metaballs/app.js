
require( [ '../src/loader' ],
function()
{
	'use strict';
	
	require( [ 'App/Metaballs', 'Core/Point2D', 'Core/NormalizedColor', 'jquery', '../metaballs/ui' ],
	function( Metaballs, Point2D, NormalizedColor, $, ui )
	{
		var app, myInterval,
			balls			= [],
			canvasWidth		= $( '#surface' ).width(),
			canvasHeight	= $( '#surface' ).height();

		for( var i = 0; i < 8; i++ )
		{
			var radius	= 25 + 25 * Math.random();

			balls.push(
					{
						pos			: new Point2D(
											radius + ( canvasWidth - radius * 2 ) * Math.random(),
											radius + ( canvasHeight - radius * 2 ) * Math.random()
										),
						radius		: radius,
						power		: 0.5 + Math.random() * 0.5,
						direction	: new Point2D( -1 + Math.random() * 2, -1 + Math.random() ),
						tint		: new NormalizedColor( 0.7 + 0.3 * Math.random(), 0.7 + 0.3 * Math.random(), 0.7 + 0.3 * Math.random() )
					}
				);
		}

		/*var balls = [
				{
					pos		: new Point2D( 300, 240 ),
					radius	: 40,
					power	: 1.0
				},

				{
					pos		: new Point2D( 400, 250 ),
					radius	: 40,
					power	: 1.0
				}
			];*/


		var init = function()
		{
			app = new Metaballs( 'surface' );

			ui.init( app );

			app.add( balls );


			myInterval = setInterval(
					function()
					{
						if( ( app.isDrawing() === true ) || ( app.isPaused() === true ) )
						{
							return;
						}

						for( var i = 0; i < balls.length; i++ )
						{
							var b = balls[ i ];

							b.pos.add( b.direction );

							if( ( b.pos.x < b.radius ) && ( b.direction.x < 0 ) )
							{
								b.direction.x	= -b.direction.x;
								b.pos.x			= b.radius;
							}

							if( ( b.pos.y < b.radius ) && ( b.direction.y < 0 ) )
							{
								b.direction.y	= -b.direction.y;
								b.pos.y			= b.radius;
							}

							if( ( b.pos.x > canvasWidth - b.radius ) && ( b.direction.x > 0 ) )
							{
								b.direction.x	= -b.direction.x;
								b.pos.x			= canvasWidth - b.radius;
							}

							if( ( b.pos.y > canvasHeight - b.radius ) && ( b.direction.y > 0 ) )
							{
								b.direction.y	= -b.direction.y;
								b.pos.y			= canvasHeight - b.radius;
							}
						}

						app.draw();
					},
					10
				);
		};


		init();
	} );
} );
