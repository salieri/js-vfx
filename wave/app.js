
require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [ 'App/Wave', '../wave/ui', 'jquery', 'jqueryui' ],
	function( Wave, ui )
	{
		var app;
		var myInterval;


		var init = function()
		{
			app = new Wave( 'surface', 'resources/bg.jpg' );

			ui.init( app );

			myInterval = setInterval(
					function()
					{
						if( ( app.isDrawing() === true ) || ( app.isPaused() === true ) )
						{
							return;
						}

						app.phase += 0.1;
						app.draw();
					},
					25
				);
		};


		init();
	} );
} );


