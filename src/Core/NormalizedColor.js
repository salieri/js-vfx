

/**
 * 
 * @param {float|NormalizedColor|Color} r
 * @param {float} g
 * @param {float} b
 * @param {float} a
 * @returns {NormalizedColor}
 */

function NormalizedColor( r, g, b, a )
{
	this.set( r, g, b, a );
}


NormalizedColor.prototype = {
	
	/**
	 * @param {float|Color|NormalizedColor} r
	 * @param {float} g
	 * @param {float} b
	 * @param {float} a
	 */
	
	set : function( r, g, b, a )
	{
		if( r instanceof Color )
		{
			r.getNormalizedColor( this );
		}
		else if( r instanceof NormalizedColor )
		{
			this.r = r.r;
			this.g = r.g;
			this.b = r.b;
			this.a = r.a;
		}
		else
		{
			this.r = Math.max( Math.min( r, 1 ), 0 ) || 0;
			this.g = Math.max( Math.min( g, 1 ), 0 ) || 0;
			this.b = Math.max( Math.min( b, 1 ), 0 ) || 0;
			this.a = Math.max( Math.min( a, 1 ), 0 ) || 1;
		}
	},	
	

	/**
	 * @param {Color} color
	 */
	
	getColor : function( color )
	{
		color.r = Math.round( this.r * 255 );
		color.g = Math.round( this.g * 255 );
		color.b = Math.round( this.b * 255 );
		color.a = Math.round( this.a * 255 );
	}
	
};
	
	


