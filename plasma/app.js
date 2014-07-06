
require( [ '../src/loader' ],
function()
{
	'use strict';
	
	require( [ 'App/Plasma', 'jquery', 'jqueryui' ],
	function( Plasma, $ )
	{
		var app;
		var myInterval;

		var init = function()
		{
			app = new Plasma( 'surface' );

			myInterval = setInterval(
					function()
					{
						if( ( app.isDrawing() === true ) || ( app.isPaused() === true ) )
						{
							return;
						}

						app.draw();
					},
					25
				);
		};


		init();

	} );
} );
