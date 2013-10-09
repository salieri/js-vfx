
function LightData( intensity, color )
{
	this.active		= true;
	this.intensity	= intensity || 1.0;
	this.color		= color || new Color( 255, 255, 255 );	
}
	
	
LightData.prototype = {
	
	/**
	 * @param {int} r
	 * @param {int} g
	 * @param {int} b
	 * @returns {undefined}
	 */
	
	setColor : function( r, g, b )
	{
		this.color.set( r, g, b );
	},

	
	/**
	 * @param {float} intensity
	 */
	
	setIntensity : function( intensity )
	{
		this.intensity = intensity;
	},
	

	/**
	 * @param {Boolean} isActive
	 */
	
	setActive : function( isActive )
	{
		this.active = isActive;
	}
	
};


