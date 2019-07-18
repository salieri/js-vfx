
define( [ 'Core/NormalizedColor' ],

function( NormalizedColor )
{
	'use strict';

	/**
	 * @constructor
	 * @param {NormalizedColor} [light]
	 */

	var Ambience = function( light )
	{
		this.light		= light || new NormalizedColor( 0.3, 0.3, 0.3 );
	};

	return Ambience;
} );
