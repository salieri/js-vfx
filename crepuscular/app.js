
require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [ '../crepuscular/ui', 'App/CrepuscularApp', 'Core/Point2D', 'jquery', 'jqueryui' ],
	function( ui, CrepuscularApp, Point2D, $ )
	{
		var myInterval;

		var radsPerSecond	= 0.6;
		var radius			= 40;
		var	gridPosX		= -120;
		var gridPosY		= -200;

		var lights			= [
				{
					active		: true,
					drawLight	: true,
					position	: new Point2D( 160, 100 ),

					radiusPerSecond	: -0.9,
					radiusX				: 80,
					radiusY				: 80,
					origin				: new Point2D( 160, 100 ),

					weight		: 0.25,
					decay		: 0.8,
					exposure	: 0.8,
					density		: 0.45,
					samples		: 20,
					imageUrl	: 'resources/light.png'
				}
			];


		var init = function()
		{
			var app	= new CrepuscularApp( 'surface', 'resources/bg.png', 'resources/mask3.png', 'resources/light.png' );

			app.addLight( lights );

			ui.init( app );

			// app.draw();

			// Rotating light
			myInterval = setInterval(
					function()
					{
						if( ( app.isDrawing() === true ) || ( app.isPaused() === true ) )
						{
							return;
						}

						var curTime	= new Date();
						var runTime	= ( curTime.getTime() - app.startTime.getTime() ) / 1000.00;

						for( var i = 0; i < lights.length; i++ )
						{
							lights[ i ].position.set(
									lights[ i ].origin.x + lights[ i ].radiusX * Math.sin( lights[ i ].radiusPerSecond * runTime ),
									lights[ i ].origin.y + lights[ i ].radiusY * Math.cos( lights[ i ].radiusPerSecond * runTime )
								);
						}

						app.draw();
					},
					25
				);
		};

		init();
	} );
} );
