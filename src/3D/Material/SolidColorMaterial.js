
/**
 * @param {Color} [color]
 * @extends Material
 * @constructor
 */

function SolidColorMaterial( color )
{
	this.color		= color || new Color( 0, 192, 0 );
	this.texture	= null;
}


SolidColorMaterial.prototype = Helper.extend( Material.prototype );

