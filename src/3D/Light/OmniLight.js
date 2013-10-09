
/**
 * @param {Point3D} position
 * @param {float} intensity
 * @param {Color} color
 */

function OmniLight( position, intensity, color )
{
	this.position	= position;
	this.intensity	= intensity;
	this.color		= color;
}
	

OmniLight.prototype = Helper.extend( Light.prototype );





