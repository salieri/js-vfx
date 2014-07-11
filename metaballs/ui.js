

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
					$( '#inputMinThreshold' ).slider({
							value		: 1,
							orientation	: 'horizontal',
							min			: 1,
							max			: 1200,
							slide		: function( event, data )
							{
								app.thresholdMin = data.value / 1000.0;
								console.log( 'Min threshold: ' + app.thresholdMin );
							}
						});
				}
			);

			$(
				function()
				{
					$( '#inputMaxThreshold' ).slider({
							value		: 3100,
							orientation	: 'horizontal',
							min			: 1,
							max			: 3100,
							slide		: function( event, data )
							{
								if( data.value >= 3000 )
								{
									data.value = 1000000;
								}

								app.thresholdMax = data.value / 1000.0;
								console.log( 'Max threshold: ' + app.thresholdMax );
							}
						});
				}
			);

		}
	};

	return ui;
} );
