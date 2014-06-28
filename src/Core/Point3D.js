
define( [],

function()
{
	'use strict';

	/**
	 * @param {int|float|Number|Vector3D|Point3D} [x=0]
	 * @param {int|float|Number} [y=0]
	 * @param {int|float|Number} [z=0]
	 * @constructor
	 */
	var Point3D = function( x, y, z )
	{
		if( x instanceof Point3D ) // works with Vector3D too, since it's a subclass
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
	};


	Point3D.prototype = {

		/**
		 * @returns {Point3D}
		 * @public
		 */
		clone : function()
		{
			return new Point3D( this.x, this.y, this.z );
		},


		/**
		 * @param {Point3D} p
		 * @public
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


		/**
		 * @public
		 */
		round : function()
		{
			this.x = Math.round( this.x );
			this.y = Math.round( this.y );
			this.z = Math.round( this.z );
		},


		/**
		 * @public
		 */
		normalize : function()
		{
			var d = Math.sqrt( ( this.x * this.x ) + ( this.y * this.y ) + ( this.z * this.z ) );

			this.x = this.x * ( 1.0 / d );
			this.y = this.y * ( 1.0 / d );
			this.z = this.z * ( 1.0 / d );
		},


		/**
		 * @param {int|float|Number|Vector3D|Point3D} x
		 * @param {int|float|Number} [y]
		 * @param {int|float|Number} [z]
		 * @public
		 */
		set : function( x, y, z )
		{
			if( x instanceof Point3D ) // works with Vector3D too, since it's a subclass
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
		 * @public
		 */
		add : function( point )
		{
			this.x += point.x;
			this.y += point.y;
			this.z += point.z;
		},


		/**
		 * @param {Point3D|Vector3D} point
		 * @public
		 */
		subtract : function( point )
		{
			this.x -= point.x;
			this.y -= point.y;
			this.z -= point.z;
		},


		/**
		 * @param {Point3D|Vector3D} point
		 * @public
		 */
		multiply : function( point )
		{
			this.x *= point.x;
			this.y *= point.y;
			this.z *= point.z;
		},


		/**
		 * @param {float|int|Number} value
		 * @public
		 */
		divideByVal : function( value )
		{
			this.x /= value;
			this.y /= value;
			this.z /= value;
		},


		/**
		 * @param {float|int|Number} value
		 * @public
		 */
		multiplyByVal : function( value )
		{
			this.x *= value;
			this.y *= value;
			this.z *= value;
		},


		/**
		 * @public
		 */
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
		 * @public
		 */
		setToCenter : function( p1, p2, p3 )
		{
			var minX = Math.min( p1.x, p2.x, p3.x );
			var minY = Math.min( p1.y, p2.y, p3.y );
			var minZ = Math.min( p1.z, p2.z, p3.z );

			this.x = minX + ( ( Math.max( p1.x, p2.x, p3.x ) - minX ) / 2 );
			this.y = minY + ( ( Math.max( p1.y, p2.y, p3.y ) - minY ) / 2 );
			this.z = minZ + ( ( Math.max( p1.z, p2.z, p3.z ) - minZ ) / 2 );

		},


		/**
		 * @param {Point3D} pointA
		 * @param {Point3D} pointB
		 * @param {int} stepCount
		 * @public
		 */
		interpolate : function( pointA, pointB, stepCount )
		{
			this.x = ( pointB.x - pointA.x ) / stepCount;
			this.y = ( pointB.y - pointA.y ) / stepCount;
			this.z = ( pointB.z - pointA.z ) / stepCount;
		},


		/**
		 * @param {float|int|Number} value
		 * @public
		 */
		addByVal : function( value )
		{
			this.x += value;
			this.y += value;
			this.z += value;
		}
	};


	return Point3D;
} );

