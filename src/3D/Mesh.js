
function Mesh( name )
{
	this.name		= name;
	this.visible	= true;
		
	/**
	 * @type Vertex[]
	 */
	this.vertices	= [];	
	
	
	/**
	 * @type Face[]
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
		this.vertices.push( new Vertex( point ) );
	},
	
	
	/**
	 * @param {Edge} edge
	 */

	addEdge : function( edge )
	{
		this.edges.push( edge );
	},
	
	
	/**
	 * @param {Face} face
	 */
	
	addFace : function( face )
	{
		this.faces.push( face );
		
		var faceNo = this.faces.length - 1;
		
		face.order = faceNo;
		
		this.vertices[ face.a ].faces.push( faceNo );
		this.vertices[ face.b ].faces.push( faceNo );
		this.vertices[ face.c ].faces.push( faceNo );
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
			/**
			 * @type Vertex
			 */
			var vertex = this.vertices[ i ];
			
			var ov	= vertex.origin;
			var v	= vertex.transformed;
			
			var x2	= ov.x;
			var y	= ov.y;
			var z	= ov.z;

			// ROT X
			// var x2 = x;
			var y3	= y * cosX - z * sinX;
			var z2	= y * sinX + z * cosX;

			// ROT Y
			var x3	= x2 * cosY + z2 * sinY;
			// var y3 = y2;
			v.z		= x2 * ( -sinY ) + z2 * cosY;
			
			// ROT Z
			v.x		= x3 * cosZ - y3 * sinZ;
			v.y		= x3 * sinZ + y3 * cosZ;
			// v.z	= z3;
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
				this.vertices[ i ].transformed.multiply( this.scale );
			}
		}
	},


	translate : function()
	{
		var l = this.vertices.length;
		
		for( var i = 0; i < l; i++ )
		{
			this.vertices[ i ].transformed.add( this.position );
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
		camera.transform( this.vertices );
	},

	
	/**
	 * @param {Camera} camera
	 */
	project : function( camera )
	{
		camera.project( this.vertices );
	},
	
	
	drawVertices : function()
	{
		var l = this.vertices.length;
		
		for( var i = 0; i < l; i++ )
		{
			Draw.setPixel( this.vertices[ i ].cameraProjected, Draw.color );
		}
	},
	
	
	drawWireframe : function()
	{
		var l = this.edges.length;
		
		for( var i = 0; i < l; i++ )
		{
			Draw.line( this.vertices[ this.edges[ i ].a ].cameraProjected, this.vertices[ this.edges[ i ].b ].cameraProjected, Draw.color );
		}
	},
	
	
	drawFlat : function()
	{
		var l = this.faces.length;
		
		for( var i = 0; i < l; i++ )
		{
			Draw.triangle( this.vertices[ this.faces[ i ].a ].cameraProjected, this.vertices[ this.faces[ i ].b ].cameraProjected, this.vertices[ this.faces[ i ].c ].cameraProjected );
		}
	},
			
	
	calculateFaceNormals : function()
	{
		var l = this.faces.length;
		
		for( var i = 0; i < l; i++ )
		{
			var p1 = this.vertices[ this.faces[ i ].a ].cameraTransformed;
			var p2 = this.vertices[ this.faces[ i ].b ].cameraTransformed;
			var p3 = this.vertices[ this.faces[ i ].c ].cameraTransformed;
			
			this.faces[ i ].normal.normal( p1, p2, p3 );		
			this.faces[ i ].normal.normalize();
			
			this.faces[ i ].position.setToCenter( p1, p2, p3 );			
		}
	},
	
	
	calculateVertexNormals : function()
	{
		var l = this.vertices.length;
		
		for( var i = 0; i < l; i++ )
		{
			var vertexFaces		= this.vertices[ i ].faces;
			var faceLength		= vertexFaces.length;
			var normalVertex	= this.vertices[ i ].normal;
			
			normalVertex.set( 0, 0, 0 );
			
			for( var j = 0; j < faceLength; j++ )
			{
				normalVertex.add( this.faces[ vertexFaces[ j ] ].normal );
			}			
			
			normalVertex.divideByVal( faceLength );
			normalVertex.normalize();
		}
	},
	
	
	calculateFaceLightData : function( scene, camera )
	{
		var lightCount	= scene.lights.length;
		var faceCount	= this.faces.length;
		
		for( var j = 0; j < faceCount; j++ )
		{
			var face = this.faces[ j ];
			
			face.lightData.reset( scene.ambience );
			
			for( var i = 0; i < lightCount; i++ )
			{
				scene.lights[ i ].calculateLightData( camera.orientation, face.position, face.normal, face.lightData );
			}
		}
	},
	
	
	calculateVertexLightData : function( scene, camera )
	{
		var lightCount	= scene.lights.length;
		var vertexCount	= this.vertices.length;
		
		for( var j = 0; j < vertexCount; j++ )
		{
			var vertex = this.vertices[ j ];
			
			vertex.lightData.reset( scene.ambience );
			
			for( var i = 0; i < lightCount; i++ )
			{
				scene.lights[ i ].calculateLightData( camera.orientation, vertex.cameraTransformed, vertex.normal, vertex.lightData );
			}
		}
	}
	
};


