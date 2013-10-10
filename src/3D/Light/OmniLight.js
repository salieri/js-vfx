
/**
 * @param {Point3D} position
 * @param {NormalizedColor} diffuseColor
 * @link http://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_shading_model
 */

function OmniLight( position, diffuseColor )
{
	/**
	 * @type {Point3D}
	 */
	this.position			= position;
	
	/**
	 * @type {Color}
	 */	
	this.diffuseColor		= diffuseColor;
	this.diffusePower		= 0.5;
	
	this.specularHardness	= 0.5;
	this.specularPower		= 0.5;
	this.specularColor		= new NormalizedColor( 1, 1, 1 );
}
	

OmniLight.prototype = Helper.extend( Light.prototype );


/**
 * @param {Vector3D} viewerDirection
 * @param {Point3D} normal3DPosition
 * @param {Vector3D} normal
 * @param {LightData} targetLightData
 */

OmniLight.prototype.calculateLightData = function( viewerDirection, normal3DPosition, normal, targetLightData )
{
	if( this.diffusePower > 0 )
	{
		var lightDirection = new Vector3D( this.position );
		
		lightDirection.subtract( normal3DPosition );
				
		var distance = lightDirection.length();

		lightDirection.normalize();

		distance = distance * distance;

		var NdotL		= normal.dot( lightDirection );
		var intensity	= Math.min( Math.max( NdotL, 0.0 ), 1.0 );

		var intensityPowerDistance	= intensity * this.diffusePower / distance;

		targetLightData.diffuseColor.r += this.diffuseColor.r * intensityPowerDistance;
		targetLightData.diffuseColor.g += this.diffuseColor.g * intensityPowerDistance;
		targetLightData.diffuseColor.b += this.diffuseColor.b * intensityPowerDistance;

		// var H = ( lightDir + viewDir ).normalize();	
		lightDirection.add( viewerDirection );
		lightDirection.normalize();

		var NdotH = normal.dot( lightDirection /* H */ );

		intensity = Math.pow( Math.min( Math.max( NdotH, 0.0 ), 1.0 ), this.specularHardness );

		intensityPowerDistance	= intensity * this.specularPower / distance;

		targetLightData.specularColor.r += this.specularColor.r * intensityPowerDistance;
		targetLightData.specularColor.g += this.specularColor.g * intensityPowerDistance;
		targetLightData.specularColor.b += this.specularColor.b * intensityPowerDistance;
	}
};

