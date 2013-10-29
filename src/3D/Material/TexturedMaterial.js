
/**
 * @param {CanvasTexture} [texture]
 * @extends Material
 * @constructor
 */

function TexturedMaterial( texture )
{
	this.texture	= texture;
	this.color		= null;
}


TexturedMaterial.prototype = Helper.extend( Material.prototype );

