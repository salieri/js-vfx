
/**
 * @param {float|Vector3D|Point3D|Point2D} x
 * @param {float} y
 */

function Point2D( x, y )
{
	if( ( x instanceof Vector3D ) || ( x instanceof Point3D ) || ( x instanceof Point2D ) )
	{
		this.x = x.x;
		this.y = x.y;
	}
	else
	{
		this.x = x || 0;
		this.y = y || 0;
	}
}


Point2D.prototype = {
	
	/**
	 * @returns {Point2D}
	 */
	
	clone : function()
	{
		return new Point2D( this.x, this.y );
	},
	
	
	/**
	 * @param {Point2D} p
	 */
	
	swap : function( p )
	{
		var tx = p.x;
		var ty = p.y;
		
		p.x = this.x;
		p.y = this.y;
		
		this.x = tx;
		this.y = ty;
	},
	
	
	round : function()
	{
		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
	},

	
	/**
	 * @param {float|Vector3D|Point3D|Point2D} x
	 * @param {float} y
	 */
	
	set : function( x, y )
	{
		if( ( x instanceof Vector3D ) || ( x instanceof Point3D ) || ( x instanceof Point2D ) )
		{
			this.x = x.x;
			this.y = x.y;
		}
		else
		{
			this.x = x;
			this.y = y;
		}
	}
	
};
