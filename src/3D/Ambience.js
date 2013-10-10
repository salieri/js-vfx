
/**
 * @param {NormalizedColor} light
 * @returns {undefined}
 */

function Ambience( light )
{
	this.light		= light || new NormalizedColor( 0.3, 0.3, 0.3 );
}

