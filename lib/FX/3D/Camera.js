
/**
 * @link http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
 */

function Camera()
{
	this.position		= new Point3D( 0, 0, 0 );
	this.orientation	= new Vector3D( 0, 0, 100.0 );
	this.viewerPosition	= new Point3D( -320, -240, 200.0 );
}


Camera.prototype = {
	
	
	/**
	 * @param {Point3D[]} sourcePoints
	 * @param {Point3D[]} targetPoints
	 */
	
	transform : function( sourcePoints, targetPoints )
	{
		var camPos	= this.position;
		var l		= sourcePoints.length;
		
		var cosX	= Math.cos( this.orientation.x );
		var sinX	= Math.sin( this.orientation.x );
		
		var cosY	= Math.cos( this.orientation.y );
		var sinY	= Math.sin( this.orientation.y );
		
		var cosZ	= Math.cos( this.orientation.z );
		var sinZ	= Math.sin( this.orientation.z );		
		
		for( var i = 0; i < l; i++ )
		{
			var sourcePoint	= sourcePoints[ i ];
			var targetPoint	= targetPoints[ i ];			
			
			targetPoint.x = cosZ *
					(
						sinZ * ( sourcePoint.y - camPos.y ) + 
						cosZ * ( sourcePoint.x - camPos.x ) 
					)
					-
					(
						sinY * ( sourcePoint.z - camPos.z )
					);

			targetPoint.y = sinX *
					(
						cosY * ( sourcePoint.z - camPos.z ) +
						sinY * 
						(
							sinZ * ( sourcePoint.y - camPos.y ) + 
							cosZ * ( sourcePoint.x - camPos.x ) 
						)
					)
					+ 
					cosX *
					(
						cosZ * ( sourcePoint.y - camPos.y ) -
						sinZ * ( sourcePoint.x - camPos.x )
					);

			targetPoint.z = cosX *
					(
						cosY * ( sourcePoint.z - camPos.z ) +
						sinY * 
						(
							sinZ * ( sourcePoint.y - camPos.y ) +
							cosZ * ( sourcePoint.x - camPos.x ) 
						)
					)
					-
					sinX *
					(
						cosZ * ( sourcePoint.y - camPos.y ) -
						sinZ * ( sourcePoint.x - camPos.x )
					);
		}
	},
	
	
	/**
	 * @param {Point3D[]} sourcePoints
	 * @param {Point2D[]} targetPoints
	 */
	
	project : function( sourcePoints, targetPoints )
	{
		var l				= sourcePoints.length;
		var viewerPosition	= this.viewerPosition;
		
		for( var i = 0; i < l; i++ )
		{
			var sourcePoint = sourcePoints[ i ];
			var targetPoint = targetPoints[ i ];
			var zDiv		= viewerPosition.z / sourcePoint.z;
			
			targetPoint.x	= zDiv * sourcePoint.x - viewerPosition.x;
			targetPoint.y	= zDiv * sourcePoint.y - viewerPosition.y;
		}
	}
	
};

