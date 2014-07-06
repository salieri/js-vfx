

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
					$( '#inputIterations' ).slider({
							value		: 40,
							orientation	: 'horizontal',
							min			: 1,
							max			: 100,
							slide		: function( event, data )
							{
								app.maxIterations = data.value;

								app.calculatePalette();
								app.draw();
							}
						});
				}
			);

			$(
				function()
				{
					$( '#inputZoom' ).slider({
							value		: 100,
							orientation	: 'horizontal',
							min			: 100,
							max			: 1000,
							slide		: function( event, data )
							{
								app.zoom = data.value / 100.0;
								app.draw();
							}
						});
				}
			);

		}
	};

	return ui;
} );
