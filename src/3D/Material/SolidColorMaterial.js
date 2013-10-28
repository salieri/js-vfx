
/**
 * @param {Color} [color]
 * @extends Material
 */

function SolidColorMaterial( color )
{
	this.color = color || new Color( 0, 192, 0 );
}


SolidColorMaterial.prototype = Helper.extend( Material.prototype );

