
require( [ '../src/loader' ],
function()
{
	'use strict';
	
	require( [ 'App/Sierpinski', '../sierpinski/ui' ],
	function( Sierpinski, ui )
	{
		var app;

		var init = function()
		{
			app = new Sierpinski( 'surface' );

			ui.init( app );

			app.draw();
		};


		init();

	} );
} );
