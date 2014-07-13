

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
					$( '#inputAmplitude' ).slider({
							value		: Math.round( app.amplitude * 100 ),
							orientation	: 'horizontal',
							min			: 100,
							max			: 16000,
							slide		: function( event, data )
							{
								app.amplitude = data.value / 100;
								console.log( 'Amplitude: ' + app.amplitude );
							}
						});
				}
			);

			$(
				function()
				{
					$( '#inputFrequency' ).slider({
							value		: Math.round( app.frequency * 100 ),
							orientation	: 'horizontal',
							min			: 300,
							max			: 100000,
							slide		: function( event, data )
							{
								app.frequency = data.value / 100;
								console.log( 'Frequency: ' + app.frequency );
							}
						});
				}
			);

		}
	};

	return ui;
} );
