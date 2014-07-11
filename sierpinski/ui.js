

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
							value		: 15,
							orientation	: 'horizontal',
							min			: 1,
							max			: 30,
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
							max			: 5000,
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
