
require( [ '../src/loader' ],
function()
{
	'use strict';
	
	require( [ 'App/Mandelbrot', '../mandelbrot/ui', 'jquery', 'jqueryui' ],
	function( Mandelbrot, ui, $ )
	{
		var app;
		var myInterval;

		var init = function()
		{
			app = new Mandelbrot( 'surface' );

			ui.init( app );

			app.draw();

			/*myInterval = setInterval(
					function()
					{
						if( ( app.isDrawing() === true ) || ( app.isPaused() === true ) )
						{
							return;
						}

						app.draw();
					},
					25
				);*/
		};


		init();

	} );
} );
