

define( [ 'Core/Helper', 'jquery', 'jqueryui' ],

function( Helper, $ )
{
	'use strict';

	var ui = {
		init : function( app )
		{
			$(
				function()
				{
					$( '#inputWeight' ).slider({
							value		: 250,
							orientation	: 'horizontal',
							min			: 0,
							max			: 2000,
							slide		: function( event, data )
							{
								app.lights[ 0 ].weight = data.value / 1000;
								console.log( 'Weight: ' + app.lights[ 0 ].weight );
							}
						});

					$( '#inputDecay' ).slider({
							value		: 800,
							orientation	: 'horizontal',
							min			: 0,
							max			: 2000,
							slide		: function( event, data )
							{
								app.lights[ 0 ].decay = data.value / 1000;
								console.log( 'Decay: ' + app.lights[ 0 ].decay );
							}
						});

					$( '#inputExposure' ).slider({
							value		: 800,
							orientation	: 'horizontal',
							min			: 0,
							max			: 2000,
							slide		: function( event, data )
							{
								app.lights[ 0 ].exposure = data.value / 1000;
								console.log( 'Exposure: ' + app.lights[ 0 ].exposure );
							}
						});

					$( '#inputDensity' ).slider({
							value		: 450,
							orientation	: 'horizontal',
							min			: 0,
							max			: 2000,
							slide		: function( event, data )
							{
								app.lights[ 0 ].density = data.value / 1000;
								console.log( 'Density: ' + app.lights[ 0 ].density );
							}
						});

					$( '#inputSamples' ).slider({
							value		: 20,
							orientation	: 'horizontal',
							min			: 0,
							max			: 150,
							slide		: function( event, data )
							{
								app.lights[ 0 ].samples = Math.round( data.value );
								console.log( 'Samples: ' + app.lights[ 0 ].samples );
							}
						});


					$( '#inputDrawLight' ).click(
							function()
							{
								app.lights[ 0 ].drawLight = $( '#inputDrawLight' ).prop( 'checked' );
							}
						);

					$( '.uibutton' ).button();

					$( '#inputDrawMask' ).click(
							function()
							{
								app.drawMask = $( '#inputDrawMask' ).prop( 'checked' );
							}
						);

					$( '.uibutton' ).button();

					$( '#inputDrawBackground' ).click(
							function()
							{
								app.drawBackground = $( '#inputDrawBackground' ).prop( 'checked' );
							}
						);

					$( '.uibutton' ).button();


					$( '#inputDirtySurface' ).click(
							function()
							{
								app.dirtySurface = $( '#inputDirtySurface' ).prop( 'checked' );
							}
						);

					$( '.uibutton' ).button();



					$( document ).on(
							'mousemove',
							'#surface',
							function( event )
							{
								var coordinates = Helper.getCanvasCoordinates( event, 'surface' );

								app.lights[ 0 ].position.set( coordinates.x, coordinates.y );
								app.draw();
							}
						);


					$( document ).on(
							'mouseout',
							'#surface',
							function()
							{
								app.setPaused( false );
							}
						);


					$( document ).on(
							'mouseover',
							'#surface',
							function()
							{
								app.setPaused( true );
							}
						);

				}
			);



		}
	};

	return ui;
} );
