
/**
 * @constructor
 * @param {NormalizedColor} [light]
 */

function Ambience( light )
{
	this.light		= light || new NormalizedColor( 0.3, 0.3, 0.3 );
}

