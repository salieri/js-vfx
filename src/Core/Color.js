
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
	},
	

	/**
	 * @param {Color} color
	 */
	
	add : function( color )
	{
		this.r = Math.round( Math.max( 0, Math.min( this.r + color.r, 255 ) ) );
		this.g = Math.round( Math.max( 0, Math.min( this.g + color.g, 255 ) ) );
		this.b = Math.round( Math.max( 0, Math.min( this.b + color.b, 255 ) ) );
	},
	
	
	/**
	 * @param {Color} color
	 */
	
	swap : function( color )
	{
		var tmp	= color.r;
		color.r	= this.r;
		this.r	= tmp;

		tmp		= color.g;
		color.g	= this.g;
		this.g	= tmp;
		
		tmp		= color.b;
		color.b	= this.b;
		this.b	= tmp;
		
		tmp		= color.a;
		color.a	= this.a;
		this.a	= tmp;
	},
	
	
	/**
	 * @param {Color|NormalizedColor} color
	 */
	
	multiply : function( color )
	{
		this.r = Math.min( 255, Math.max( Math.round( color.r * this.r ), 0 ) );
		this.g = Math.min( 255, Math.max( Math.round( color.g * this.g ), 0 ) );
		this.b = Math.min( 255, Math.max( Math.round( color.b * this.b ), 0 ) );
		this.a = Math.min( 255, Math.max( Math.round( color.a * this.a ), 0 ) );
	}
	
};
	
	


