
require( [ '../src/loader' ],
function()
{
	'use strict';
	
	require( [ 'App/BilinearInterpolator', 'jquery', 'jqueryui' ],
	function( BilinearInterpolator, $ )
	{
		var biApp;
		var myInterval;

		var directions = [
			{
				name		: 'q11',
				speed		: 0.005,
				direction	: -1
			},
			{
				name		: 'q12',
				speed		: 0.0035,
				direction	: 1
			},
			{
				name		: 'q21',
				speed		: 0.0015,
				direction	: 1
			},
			{
				name		: 'q22',
				speed		: 0.002,
				direction	: -1
			}
		];


		function updateDirections()
		{
			for( var i = 0; i < 4; i++ )
			{
				var val = biApp[ directions[ i ].name ];

				val += ( directions[ i ].speed * directions[ i ].direction );

				if( val < 0 )
				{
					directions[ i ].direction = 1;
					val = 0;
				}

				if( val > 1 )
				{
					directions[ i ].direction = -1;
					val = 1;
				}

				biApp[ directions[ i ].name ] = val;
			}
		}


		var init = function()
		{
			biApp = new BilinearInterpolator( 'surface', 1.0, 0.7, 0.5, 0.3 ); // new Color( 255, 0, 0 ), new Color( 0, 255, 0 ), new Color( 0, 0, 255 ), new Color( 255, 0, 0 ) );

			myInterval = setInterval(
					function()
					{
						if( ( biApp.isDrawing() === true ) || ( biApp.isPaused() === true ) )
						{
							return;
						}

						updateDirections();
						biApp.draw();
					},
					25
				);
		};


		init();

	} );
} );
