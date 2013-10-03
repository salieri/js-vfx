

function SimpleCamera()
{
	this.viewerPosition		= new Point2D( 320, 240 );
	this.perspectiveDepth	= 100;
}


SimpleCamera.prototype = {
	
	/**
	 * @param {Point3D[]} sourcePoints
	 * @param {Point3D[]} targetPoints
	 */
	
	transform : function( sourcePoints, targetPoints )
	{
		var l = sourcePoints.length;
		
		for( var i = 0; i < l; i++ )
		{
			var sourcePoint	= sourcePoints[ i ];
			var targetPoint	= targetPoints[ i ];
			
			targetPoint.x = sourcePoint.x;
			targetPoint.y = sourcePoint.y;
			targetPoint.z = sourcePoint.z;
		}
	},
	
	
	/**
	 * @param {Point3D[]} sourcePoint
	 * @param {Point2D[]} targetPoint
	 */
	
	project : function( sourcePoints, targetPoints )
	{
		var l				= sourcePoints.length;
		var viewerPosition	= this.viewerPosition;
		
		for( var i = 0; i < l; i++ )
		{
			var sourcePoint = sourcePoints[ i ];
			var targetPoint = targetPoints[ i ];
			var pd			= this.perspectiveDepth / sourcePoint.z;

			targetPoint.x	= ( sourcePoint.x * pd ) + this.viewerPosition.x;
			targetPoint.y	= ( sourcePoint.y * pd ) + this.viewerPosition.y;
		}
	}
	
};

