
function Mesh( name )
{
	this.name		= name;
		
	/**
	 * @type Point3D[]
	 */
	this.originVertices	= [];
	
	/**
	 * @type Point3D[]
	 */
	this.vertices	= [];

	/**
	 * @type Point3D[]
	 */
	this.transformedVertices	= [];
	
	/**
	 * @type Point2D[]
	 */
	this.projectedVertices		= [];
	
	/**
	 * @type Facet[]
	 */
	this.faces		= [];
	
	this.position	= new Point3D( 0, 0, 0 );
	this.scale		= new Point3D( 1.0, 1.0, 1.0 );
	this.rotation	= new Point3D( 0, 0, 0 );	
}


Mesh.prototype = {

	/**
	 * @param {Point3D} point
	 */

	addVertex : function( point )
	{
		this.originVertices.push( point );
		this.vertices.push( new Point3D() );
		this.transformedVertices.push( new Point3D() );
		this.projectedVertices.push( new Point2D() );
	},


	transformOrigin : function()
	{
		for( var i = 0; i < this.originVertices.length; i++ )
		{
			var o = this.originVertices[ i ];
			
			var dx = o.x
					* 
					(
						Math.cos( this.rotation.y ) * Math.sin( this.rotation.z )
					)
					+ 
					o.y
					* 
					(
						Math.cos( this.rotation.z ) * Math.sin( this.rotation.x ) * Math.sin( this.rotation.y ) - 
						Math.cos( this.rotation.x ) * Math.sin( this.rotation.z )
					)
					+
					o.z
					*
					(
						Math.cos( this.rotation.x ) * Math.cos( this.rotation.z ) * Math.sin( this.rotation.y ) +
						Math.sin( this.rotation.x ) * Math.sin( this.rotation.z )
					);
					
			var dy = o.x
					 *
					 (
						Math.cos( this.rotation.y ) * Math.sin( this.rotation.z )
					 )
					 +
					 o.y
					 *
					 (
						Math.cos( this.rotation.x ) * Math.cos( this.rotation.z ) +
						Math.sin( this.rotation.x ) * Math.sin( this.rotation.y ) * Math.sin( this.rotation.z )
					 )
					 + 
					 (-o.z)
					*
					(
						Math.cos( this.rotation.z ) * Math.sin( this.rotation.x ) + 
						Math.cos( this.rotation.x ) * Math.sin( this.rotation.y ) * Math.sin( this.rotation.z )
					);
			
			var dz = (-o.x)
					* 
					(
						Math.sin( this.rotation.y )
					)
					+
					o.y
					*
					(
						Math.cos( this.rotation.y ) * Math.sin( this.rotation.x )
					)
					+
					o.z
					*
					(
						Math.cos( this.rotation.x ) * Math.cos( this.rotation.y )
					);
			
			this.vertices[ i ].set( 
					this.position.x + dx * this.scale.x, 
					this.position.y + dy * this.scale.y,
					this.position.z + dz * this.scale.z
				);
		}
	},
	
	
	
	/**
	 * @param {Camera} camera
	 */
	transform3D : function( camera )
	{
		for( var i = 0; i < this.vertices.length; i++ )
		{
			camera.transform3D( this.vertices[ i ], this.transformedVertices[ i ] );
		}
	},

	
	/**
	 * @param {Camera} camera
	 */
	project2D : function( camera )
	{
		for( var i = 0; i < this.transformedVertices.length; i++ )
		{
			camera.project2D( this.transformedVertices[ i ], this.projectedVertices[ i ] );
		}
	},
	
	
	drawVertices : function()
	{
		for( var i = 0; i < this.projectedVertices.length; i++ )
		{
			Draw.setPixel( this.projectedVertices[ i ], Draw.color );
		}
	}
	
};


