
require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [ '../bump/ui', 'App/Bumper', 'Core/CanvasTexture', 'jquery', 'jqueryui' ],
	function( ui, Bumper, CanvasTexture, $ )
	{
		var bumpApp;
		var myInterval;

		var radsPerSecond	= 0.8;
		var radius			= 120;
		var lightPosX		= 160;
		var lightPosY		= 100;


		var init = function()
		{
			var heightmap	= new CanvasTexture( 'resources/mbaco-heightmap2.png' );
			var texture		= new CanvasTexture( 'resources/mbaco-texture.png' );
			/*var heightmap	= new CanvasTexture( 'resources/empty-heightmap.png' );
			var texture		= new CanvasTexture( 'resources/empty-texture.png' ); */
			bumpApp			= new Bumper( 'surface', texture, heightmap );

			ui.init( bumpApp );

			bumpApp.setLightPos( 0, 0, 77 );


			// Rotating light
			myInterval = setInterval(
					function()
					{
						if( ( bumpApp.isDrawing() === true ) || ( bumpApp.isPaused() === true ) )
						{
							return;
						}

						var curTime	= new Date();
						var runTime	= ( curTime.getTime() - bumpApp.startTime.getTime() ) / 1000.00;

						var x		= lightPosX + radius * Math.sin( radsPerSecond * runTime );
						var y		= lightPosY + radius * Math.cos( radsPerSecond * runTime );
						var z		= bumpApp.lightPosition.z;

						bumpApp.setLightPos( x, y, z );
						bumpApp.draw();
					},
					25
				);
		};


		init();

	} );
} );
