
require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [ 'App/FisheyeLens', 'Core/Helper', 'jquery', 'jqueryui' ],
	function( FisheyeLens, Helper, $ )
	{
		var flApp;
		var myInterval;

		var lenses = [
				{
					x 			: 163,
					y			: 48,
					radius		: 250,
					dirX		: -1,
					dirY		: 0,
					speedX		: -1.6,
					speedY		: 0.0
				},
				{
					x 			: 263,
					y			: 98,
					radius		: 300,
					dirX		: 2.3,
					dirY		: 0,
					speedX		: 1,
					speedY		: 0.0
				}
		];


		var moveLenses = function()
		{
			var canvas = Helper.getElement( 'surface' );

			for( var i = 0; i < lenses.length; i++ )
			{
				lenses[ i ].x += lenses[ i ].speedX;
				lenses[ i ].y += lenses[ i ].speedY;

				lenses[ i ].speedY += 0.7;

				if( ( lenses[ i ].x + lenses[ i ].radius >= canvas.width ) && ( lenses[ i ].speedX >= 0 ) )
				{
					lenses[ i ].x		= canvas.width - lenses[ i ].radius;
					lenses[ i ].speedX = -Math.min( 8.0, Math.abs( lenses[ i ].speedX ) * ( 0.7 + Math.random() ) );
				}

				if( ( lenses[ i ].x < 0 ) && ( lenses[ i ].speedX <= 0 ) )
				{
					lenses[ i ].x = 0;
					lenses[ i ].speedX = Math.min( 8.0, Math.abs( lenses[ i ].speedX ) * ( 0.5 + Math.random() ) );
				}

				if( ( lenses[ i ].y < 0 ) && ( lenses[ i ].speedY <= 0 ) )
				{
					lenses[ i ].y = 0;
					lenses[ i ].speedY = -lenses[ i ].speedY * 0.9;
				}

				if( ( lenses[ i ].y + lenses[ i ].radius >= canvas.height ) && ( lenses[i ].speedY >= 0 ) )
				{
					lenses[ i ].y = canvas.height - lenses[ i ].radius;
					lenses[ i ].speedY = -lenses[ i ].speedY * 0.85;

					if( Math.abs( lenses[ i ].speedY ) < 8 )
					{
						lenses[ i ].speedY *= 3;
					}
				}
			}
		};


		var init = function()
		{
			flApp = new FisheyeLens( 'surface', 'resources/bg.jpg' );

			for( var i = 0; i < lenses.length; i++ )
			{
				flApp.addLens( lenses[ i ] );
			}

			myInterval = setInterval(
					function()
					{
						if( ( flApp.isDrawing() === true ) || ( flApp.isPaused() === true ) )
						{
							return;
						}

						moveLenses();
						flApp.draw();
					},
					25
				);
		};


		init();
	} );
} );


