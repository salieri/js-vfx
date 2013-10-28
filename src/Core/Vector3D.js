/*
 * Based on http://evanw.github.io/lightgl.js/docs/vector.html
 */


/**
 * @param {Number|int|float|Vector3D|Point3D} [x=0]
 * @param {int|float|Number} [y=0]
 * @param {int|float|Number} [z=0]
 * @constructor
 * @extends Point3D
 */

function Vector3D( x, y, z ) 
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


Vector3D.prototype = Helper.extend( Point3D.prototype );


/**
 * @returns {Vector3D}
 */

Vector3D.prototype.clone = function()
{
	return new Vector3D( this.x, this.y, this.z );
};


/**
 * Distance from a point
 * @param {int|float|Number} x
 * @param {int|float|Number} y
 * @param {int|float|Number} z
 * @returns {Number}
 */

Vector3D.prototype.distance = function( x, y, z )
{
	var xd = this.x - x;
	var yd = this.y - y;
	var zd = this.z - z;

	return Math.sqrt( 
			xd * xd + 
			yd * yd +
			zd * zd
		);
};


/**
 * Vector length
 * 
 * @returns {Number}
 */

Vector3D.prototype.length = function()
{
	return Math.sqrt( this.dot( this ) );
};


/**
 * Dot product
 * 
 * @param {Vector3D} vector
 * @returns {Number}
 */

Vector3D.prototype.dot = function( vector )
{
	return this.x * vector.x + this.y * vector.y + this.z * vector.z;
};	


/**
 * Cross product
 * 
 * @param {Vector3D} vector
 */

Vector3D.prototype.cross = function( vector )
{
	this.x = this.y * vector.z - this.z * vector.y;
	this.y = this.z * vector.x - this.x * vector.z;
	this.z = this.x * vector.y - this.y * vector.x;
};


/**
 * Normalize Vector (get a unit vector)
 */

Vector3D.prototype.normalize = function()
{
	var vectorLength = this.length();

	this.x = this.x / vectorLength;
	this.y = this.y / vectorLength;
	this.z = this.z / vectorLength;
};


/**
 * @param {Point3D|Vector3D} p1
 * @param {Point3D|Vector3D} p2
 * @param {Point3D|Vector3D} p3
 * @link http://www.opengl.org/wiki/Calculating_a_Surface_Normal
 */

Vector3D.prototype.normal = function( p1, p2, p3 )
{
	var ux = p2.x - p1.x;
	var uy = p2.y - p1.y;
	var uz = p2.z - p1.z;

	var vx = p3.x - p1.x;
	var vy = p3.y - p1.y;
	var vz = p3.z - p1.z;

	this.x = ( uy * vz ) - ( uz * vy );
	this.y = ( uz * vx ) - ( ux * vz );
	this.z = ( ux * vy ) - ( uy * vx );
};






