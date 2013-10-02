
/**
 * @param {float} x
 * @param {float} y
 * @param {float} z
 */

function Point3D( x, y, z )
{
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}


Point3D.prototype = {
	
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
	 * @param {float} x
	 * @param {float} y
	 * @param {float} z
	 */
	
	set : function( x, y, z )
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	
	
	
};




