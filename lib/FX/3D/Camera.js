
/**
 * @link http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
 */

function Camera()
{
	this.position		= new Point3D( 0, 0, 100 );
	this.orientation	= new Vector3D( 0, 0, -1.0 );
	this.viewerPosition	= new Point3D( 0, 0, 0 );
}


Camera.prototype = {
	
	/**
	 * @param {Point3D} sourcePoint
	 * @param {Point3D} targetPoint
	 * @returns {Point3D}
	 */
	
	transform3D : function( sourcePoint, targetPoint )
	{
		var dx = Math.cos( this.orientation.z ) *
				(
					Math.sin( this.orientation.z ) * ( sourcePoint.y - this.position.y ) + 
					Math.cos( this.orientation.z ) * ( sourcePoint.x - this.position.x ) 
				)
				-
				(
					Math.sin( this.orientation.y ) * ( sourcePoint.z - this.position.z )
				);
		
		var dy = Math.sin( this.orientation.x ) *
				(
					Math.cos( this.orientation.y ) * ( sourcePoint.z - this.position.z ) +
					Math.sin( this.orientation.y ) * 
					(
						Math.sin( this.orientation.z ) * ( sourcePoint.y - this.position.y ) + 
						Math.cos( this.orientation.z ) * ( sourcePoint.x - this.position.x ) 
					)
				)
				+ 
				Math.cos( this.orientation.x ) *
				(
					Math.cos( this.orientation.z ) * ( sourcePoint.y - this.position.y ) -
					Math.sin( this.orientation.z ) * ( sourcePoint.x - this.position.x )
				);
		
		var dz = Math.cos( this.orientation.x ) *
				(
					Math.cos( this.orientation.y ) * ( sourcePoint.z - this.position.z ) +
					Math.sin( this.orientation.y ) * 
					(
						Math.sin( this.orientation.z ) * ( sourcePoint.y - this.position.y ) +
						Math.cos( this.orientation.z ) * ( sourcePoint.x - this.position.x ) 
					)
				)
				-
				Math.sin( this.orientation.x ) *
				(
					Math.cos( this.orientation.z ) * ( sourcePoint.y - this.position.y ) -
					Math.sin( this.orientation.z ) * ( sourcePoint.x - this.position.x )
				);
		
		targetPoint.set( dx, dy, dz );
	},
	
	
	/**
	 * @param {Point3D} sourcePoint
	 * @param {Point2D} targetPoint
	 * @returns {Point2D}
	 */
	
	project2D : function( sourcePoint, targetPoint )
	{
		var zDiv		= this.viewerPosition.z / sourcePoint.z;		
		targetPoint.x	= zDiv * sourcePoint.x - this.viewerPosition.x;
		targetPoint.y	= zDiv * sourcePoint.y - this.viewerPosition.y;
	}
	
};

