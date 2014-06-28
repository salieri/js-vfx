

define( [ 'Core/Helper', 'jquery', 'jqueryui' ],

function( Helper, $ )
{
	var ui = {
		init : function( bumpApp )
		{
			$(
				function()
				{
					$( '#inputLightHeight' ).slider({
							value		: 77,
							orientation	: 'horizontal',
							min			: 0,
							max			: 512,
							slide		: function()
							{
								bumpApp.setLightPos( bumpApp.lightPosition.x, bumpApp.lightPosition.y, $( '#inputLightHeight' ).slider( 'value' ) );
								bumpApp.draw();
							}
						});
				}
			);

			$(
				function()
				{
					$( '#inputEmbossDepth' ).slider({
							value		: 150,
							orientation	: 'horizontal',
							min			: 1,
							max			: 1000,
							slide		: function()
							{
								bumpApp.setEmbossDepth( $( '#inputEmbossDepth' ).slider( 'value' ) / 50 );
								bumpApp.draw();
							}
						});
				}
			);

			$( document ).on(
					'mousemove',
					'#surface',
					function( event )
					{
						var coordinates = Helper.getCanvasCoordinates( event, 'surface' );

						bumpApp.setLightPos( coordinates.x, coordinates.y, bumpApp.lightPosition.z );
						bumpApp.draw();
					}
				);


			$( document ).on(
					'mouseout',
					'#surface',
					function()
					{
						bumpApp.setPaused( false );
					}
				);


			$( document ).on(
					'mouseover',
					'#surface',
					function()
					{
						bumpApp.setPaused( true );
					}
				);
		}
	};

	return ui;
} );
