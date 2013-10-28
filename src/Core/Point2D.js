
/**
 * @param {int|float|Number|Vector3D|Point3D|Point2D} [x=0]
 * @param {int|float|Number} [y=0]
 * @constructor
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
	 * @param {int|float|Number|Vector3D|Point3D|Point2D} [x=0]
	 * @param {int|float|Number} [y=0]
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
	},

	
	/**
	 * @param {Point2D} point
	 */
			
	distance : function( point )
	{
		var a = point.x - this.x;
		var b = point.y - this.y;
		
		return Math.sqrt( a * a + b * b );		
	},
	
	
	/**
	 * @param {Point2D} point
	 */
	
	subtract : function( point )
	{
		this.x -= point.x;
		this.y -= point.y;
	}
	
};
