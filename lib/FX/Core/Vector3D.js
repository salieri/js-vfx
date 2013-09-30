/*
 * Based on http://evanw.github.io/lightgl.js/docs/vector.html
 */


/**
 * @param {float} x
 * @param {float} y
 * @param {float} z
 * @returns {Vector3D}
 */

function Vector3D( x, y, z ) 
{
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}


Vector3D.prototype = {

	/**
	 * Distance from a point
	 * @param {float|Number} x
	 * @param {float|Number} y
	 * @param {float|Number} z
	 * @returns {float|Number}
	 */
	
	distance : function( x, y, z )
	{
		var xd = this.x - x;
		var yd = this.y - y;
		var zd = this.z - z;
		
		return Math.sqrt( 
				xd * xd + 
				yd * yd +
				zd * zd
			);
	},


	/**
	 * Vector length
	 * 
	 * @returns {Number}
	 */

	length : function()
	{
		return Math.sqrt( this.dot( this ) );
	},
	
	
	/**
	 * Dot product
	 * 
	 * @param {Vector3D} vector
	 * @returns {float|Number}
	 */
	
	dot : function( vector )
	{
    	return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	},	
	
	
	/**
	 * Cross product
	 * 
	 * @param {Vector3D} vector
	 * @returns {Vector3D}
	 */
	
  	cross : function( vector )
	{
		return new Vector3D(
				this.y * vector.z - this.z * vector.y,
	      		this.z * vector.x - this.x * vector.z,
	      		this.x * vector.y - this.y * vector.x
    		);
	},
	
	
	/**
	 * Normalize Vector (get a unit vector)
	 * @returns {Vector3D}
	 */
	
	normalize : function()
	{
		vectorLength = this.length();
	
		return new Vector3D(
				this.x / vectorLength,
				this.y / vectorLength,
				this.z / vectorLength		
			);	
	},
	
	
	negate : function()
	{
		return new Vector3D(
				-this.x,
				-this.y,
				-this.z
				// -this.z
			);
	},


	/**
	 * @param {float} x
	 * @param {float} y
	 * @param {float} z
	 */

	set : function( x, y, z )
	{
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}


};









