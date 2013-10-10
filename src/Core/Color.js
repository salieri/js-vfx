
/**
 * @param {int|Color} r
 * @param {int} g
 * @param {int} b
 * @param {int} a
 * @returns {Color}
 */

function Color( r, g, b, a )
{
	if( r instanceof Color )
	{
		this.set( r );
	}
	else
	{
		this.r = r || 0;
		this.g = g || 0;
		this.b = b || 0;
		this.a = a || 255;
	}
}


Color.prototype = {
	
	/**
	 * @param {int|Color} r
	 * @param {int} g
	 * @param {int} b
	 * @returns {undefined}
	 */
	
	set : function( r, g, b, a )
	{
		if( r instanceof Color )
		{
			this.r = r.r;
			this.g = r.g;
			this.b = r.b;
			this.a = r.a;
		}
		else
		{
			this.r = r;
			this.g = g;
			this.b = b;
			this.a = a || 255;
		}
	},
	
	
	/**
	 * @param {NormalizedColor} color
	 */
	
	getNormalizedColor : function( normalizedColor )
	{
		normalizedColor.r = this.r / 255;
		normalizedColor.g = this.g / 255;
		normalizedColor.b = this.b / 255;
		normalizedColor.a = this.a / 255;
	}
	
};
	
	


