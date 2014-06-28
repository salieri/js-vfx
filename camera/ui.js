
define( [],

function()
{
	'use strict';

	return {

		init : function( setRenderer, setObject )
		{
			$( '#renderer-selector dd' ).on(
					'click',
					function( event ) // jshint ignore:line
					{
						var type = this.id.substr( 9 );

						setRenderer( type );
					}
				);

			$( '#object-selector dd' ).on(
					'click',
					function( event ) // jshint ignore:line
					{
						var type = this.id.substr( 7 );

						setObject( type );
					}
			);
		}
	};

} );
