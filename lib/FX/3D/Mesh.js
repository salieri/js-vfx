
function Mesh( name )
{
	this.name		= name;
	this.visible	= true;
		
		
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
	this.cameraVertices	= [];
	
	/**
	 * @type Point2D[]
	 */
	this.projectedVertices		= [];
	
	/**
	 * @type Facet[]
	 */
	this.faces		= [];
	
	
	/**
	 * @type Edge
	 */
	this.edges		= [];
	
	
	this.position	= new Point3D( 0, 0, 0 );
	this.scale		= new Point3D( 1.0, 1.0, 1.0 );
	this.rotation	= new Point3D( 0.0, 0.0, 0.0 );	
}


Mesh.prototype = {

	/**
	 * @param {Point3D} point
	 */

	addVertex : function( point )
	{
		this.originVertices.push( point );
		this.vertices.push( new Point3D() );
		this.cameraVertices.push( new Point3D() );
		this.projectedVertices.push( new Point2D() );
	},
	
	
	/**
	 * @param {Edge} edge
	 */

	addEdge : function( edge )
	{
		this.edges.push( edge );
	},
	
	
	/**
	 * @param {Facet} face
	 */
	
	addFace : function( face )
	{
		this.faces.push( face );
	},
	

	/**
	 * @link http://en.wikipedia.org/wiki/Rotation_matrix
	 */

	rotateMatrix : function()
	{
		var cosX = Math.cos( this.rotation.x );
		var sinX = Math.sin( this.rotation.x );
		var cosY = Math.cos( this.rotation.y );
		var sinY = Math.sin( this.rotation.y );
		var cosZ = Math.cos( this.rotation.z );
		var sinZ = Math.sin( this.rotation.z );
	
		/* I'm not using matrices here simply because testing showed 
		 * they're about 25% slower than 'do it yourself' method */
		
		var l = this.vertices.length;
		
		for( var i = 0; i < l; i++ )
		{
			var ov	= this.originVertices[ i ];
			var v	= this.vertices[ i ];
			
			var x2 = ov.x;
			var y = ov.y;
			var z = ov.z;

			// ROT X
			// var x2 = x;
			var y3 = y * cosX - z * sinX;
			var z2 = y * sinX + z * cosX;

			// ROT Y
			var x3 = x2 * cosY + z2 * sinY;
			// var y3 = y2;
			v.z = x2 * ( -sinY ) + z2 * cosY;
			
			// ROT Z
			v.x = x3 * cosZ - y3 * sinZ;
			v.y = x3 * sinZ + y3 * cosZ;
			// v.z = z3;
		}
	},


	scaleMatrix : function()
	{
		// != on purpose
		if( ( this.scale.x != 1 ) || ( this.scale.y != 1 ) || ( this.scale.z != 1 ) ) 
		{
			var l = this.vertices.length;
			
			for( var i = 0; i < l; i++ )
			{
				this.vertices[ i ].multiply( this.scale );
			}
		}
	},


	translate : function()
	{
		var l = this.vertices.length;
		
		for( var i = 0; i < l; i++ )
		{
			this.vertices[ i ].add( this.position );
		}
	},



	transformOrigin : function()
	{
		this.rotateMatrix();
		this.scaleMatrix();
		this.translate();
	},
	
	
	
	/**
	 * @param {Camera} camera
	 */
	transformCamera : function( camera )
	{
		camera.transform( this.vertices, this.cameraVertices );
	},

	
	/**
	 * @param {Camera} camera
	 */
	project : function( camera )
	{
		camera.project( this.cameraVertices, this.projectedVertices );
	},
	
	
	drawVertices : function()
	{
		var l = this.projectedVertices.length;
		
		for( var i = 0; i < l; i++ )
		{
			Draw.setPixel( this.projectedVertices[ i ], Draw.color );
		}
	},
	
	
	drawWireframe : function()
	{
		var l = this.edges.length;
		
		for( var i = 0; i < l; i++ )
		{
			Draw.line( this.projectedVertices[ this.edges[ i ].a ], this.projectedVertices[ this.edges[ i ].b ], Draw.color );
		}
	},
	
	
	drawFlat : function()
	{
		var l = this.faces.length;
		
		for( var i = 0; i < l; i++ )
		{
			Draw.triangle( this.projectedVertices[ this.faces[ i ].a ], this.projectedVertices[ this.faces[ i ].b ], this.projectedVertices[ this.faces[ i ].c ] );
		}
	}
	
};


