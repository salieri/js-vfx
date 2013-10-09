
/**
 * @param {float|Vector3D|Point3D} x
 * @param {float} y
 * @param {float} z
 */

function Point3D( x, y, z )
{
	if( ( x instanceof Vector3D ) || ( x instanceof Point3D ) )
	{
		this.x = x.x;
		this.y = x.y;
		this.z = x.z;
	}
	else
	{
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}
}


Point3D.prototype = {
	
	/**
	 * @returns {Point3D}
	 */
	
	clone : function()
	{
		return new Point3D( this.x, this.y, this.z );
	},
	
	
	/**
	 * @param {Point3D} p
	 */
	
	swap : function( p )
	{
		var tx = p.x;
		var ty = p.y;
		var tz = p.z;
		
		p.x = this.x;
		p.y = this.y;
		p.z = this.z;
		
		this.x = tx;
		this.y = ty;
		this.z = tz;
	},
	
	
	round : function()
	{
		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );
	},
	
	
	normalize : function()
	{
		var d = Math.sqrt( ( this.x * this.x ) + ( this.y * this.y ) + ( this.z * this.z ) );

		this.x = this.x * ( 1.0 / d );
		this.y = this.y * ( 1.0 / d );
		this.z = this.z * ( 1.0 / d );
	},
	
	
	/**
	 * @param {float|Vector3D|Point3D} x
	 * @param {float} y
	 * @param {float} z
	 */
	
	set : function( x, y, z )
	{
		if( ( x instanceof Vector3D ) || ( x instanceof Point3D ) )
		{
			this.x = x.x;
			this.y = x.y;
			this.z = x.z;
		}
		else
		{
			this.x = x;
			this.y = y;
			this.z = z;
		}
	},
	
	
	/**
	 * @param {Point3D|Vector3D} point
	 */
	
	add : function( point )
	{
		this.x += point.x;
		this.y += point.y;
		this.z += point.z;
	},


	/**
	 * @param {Point3D|Vector3D} point
	 */
	
	subtract : function( point )
	{
		this.x -= point.x;
		this.y -= point.y;
		this.z -= point.z;
	},
	
	
	/**
	 * @param {Point3D|Vector3D} point
	 */
	
	multiply : function( point )
	{
		this.x *= point.x;
		this.y *= point.y;
		this.z *= point.z;
	},
	
	
	/**
	 * @param {float} value
	 */
	
	divideByVal : function( value )
	{
		this.x /= value;
		this.y /= value;
		this.z /= value;
	},
	
	
	negate : function()
	{
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	},


	/**
	 * @param {Point3D|Vector3D} p1
	 * @param {Point3D|Vector3D} p2
	 * @param {Point3D|Vector3D} p3
	 */

	setToCenter : function( p1, p2, p3 )
	{
		var minX = Math.min( p1.x, p2.x, p3.x );
		var minY = Math.min( p1.y, p2.y, p3.y );
		var minZ = Math.min( p1.z, p2.z, p3.z );
		
		this.x = minX + ( ( Math.max( p1.x, p2.x, p3.x ) - minX ) / 2 );
		this.y = minY + ( ( Math.max( p1.y, p2.y, p3.y ) - minY ) / 2 );
		this.z = minZ + ( ( Math.max( p1.z, p2.z, p3.z ) - minZ ) / 2 );
		
	}

	
};

