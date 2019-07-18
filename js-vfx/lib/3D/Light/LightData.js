
define( [ 'Core/NormalizedColor' ],

function( NormalizedColor )
{
	'use strict';

	/**
	 * @constructor
	 */
	var LightData = function()
	{
		this.specularColor	= new NormalizedColor( 0, 0, 0 );
		this.diffuseColor	= new NormalizedColor( 0, 0, 0 );
	};

	
	LightData.prototype = {

		/**
		 * @param {Ambience} [ambience]
		 */

		reset : function( ambience )
		{
			if( !ambience )
			{
				this.specularColor.set( 0, 0, 0, 0 );
				this.diffuseColor.set( 0, 0, 0 );
			}
			else
			{
				this.specularColor.set( ambience.light );
				this.diffuseColor.set( ambience.light );
			}
		}
	};


	return LightData;

} );
