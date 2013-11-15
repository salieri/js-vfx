/**
 * @class
 */
var ObjFactory = {

	/**
	 * Load Wavefront OBJ file
	 * @param {String} url
	 * @param {Scene} [scene]
	 * @returns {Mesh}
	 * @link http://en.wikipedia.org/wiki/Wavefront_.obj_file
	 */

	load : function( url, scene )
	{
		var mesh = new Mesh();

		var material	= new TexturedMaterial( new CanvasTexture( 'resources/silver.jpg' ) );
		material.color	= new Color( 0, 192, 0 );


		Helper.load(
				url,
				function( data, textStatus, jqXHR )
				{
					ObjFactory.process( data, mesh, material );

					if( scene )
					{
						scene.faceSortPile.reInit();
					}
				}
			);

		return mesh;
	},


	/**
	 * @param {String} objFileData
	 * @param {Mesh} mesh
	 * @param {Material} material
	 */
	process : function( objFileData, mesh, material )
	{
		var lines			= objFileData.split( "\n" );
		var vertexTextures	= [];

		for( var i = 0; i < lines.length; i++ )
		{
			var parameters = ObjFactory.getLineParameters( lines[ i ].trim() );

			if( parameters.length > 0 )
			{
				switch( parameters[ 0 ] )
				{
					case 'v':
						// vertices
						ObjFactory.addVertex( parameters, mesh );
						break;

					case 'f':
						// faces
						ObjFactory.addFace( parameters, mesh, vertexTextures, material );
						break;

					case 'g':
						// mesh name
						mesh.setName( parameters[ 1 ] );
						break;

					case 'vt':
						// vertex texture coordinate
						ObjFactory.addVertexTextureCoordinate( parameters, vertexTextures );
						break;

					case 'vn':
						// vertex normals
						// ignored for now
						break;

				}
			}
		}

		mesh.buildWireframe();
	},

	/**
	 * @private
	 * @param {String} line
	 * @returns {Array}
	 */

	getLineParameters : function( line )
	{
		var initialParameters	= line.split( ' ' );
		var parameters			= [];

		for( var i = 0; i < initialParameters.length; i++ )
		{
			if( initialParameters[ i ] !== '' )
			{
				parameters.push( initialParameters[ i ] );
			}
		}

		return parameters;
	},


	/**
	 * @param {String[]} parameters
	 * @param {Mesh} mesh
	 * @private
	 */
	addVertex : function( parameters, mesh )
	{
		var p = new Point3D( parameters[ 1 ], parameters[ 2 ], parameters[ 3 ] );

		mesh.addVertex( p );
	},


	/**
	 * @param {String[]} parameters
	 * @param {Mesh} mesh
	 * @param {Point3D[]} vertexTextures
	 * @private
	 */
	addFace : function( parameters, mesh, vertexTextures, material )
	{
		var a = ObjFactory.splitFaceParameter( parameters[ 1 ] );
		var b = ObjFactory.splitFaceParameter( parameters[ 2 ] );
		var c = ObjFactory.splitFaceParameter( parameters[ 3 ] );

		var uvA	= null;
		var uvB	= null;
		var uvC	= null;

		if( a.vt !== null )
		{
			uvA = new Point3D( vertexTextures[ a.vt ] );
		}

		if( b.vt !== null )
		{
			uvB = new Point3D( vertexTextures[ b.vt ] );
		}

		if( c.vt !== null )
		{
			uvC = new Point3D( vertexTextures[ c.vt ] );
		}


		var f = new Face( a.v, b.v, c.v, material, uvA, uvB, uvC );

		mesh.addFace( f );
	},


	/**
	 * @param {String} parameter
	 * @private
	 */

	splitFaceParameter : function( parameter )
	{
		var values	= parameter.split( '/' );
		var vt		= null;
		var vn		= null;

		var v		= parseInt( values[ 0 ], 10 );

		if( values.length >= 2 )
		{
			vt = parseInt( values[ 1 ], 10 );
		}

		if( values.length >= 3 )
		{
			vn = parseInt( values[ 0 ], 10 );
		}


		return {
				'v':	v - 1,
				'vt':	vt - 1,
				'vn':	vn - 1
			};
	},


	/**
	 * @param {String[]} parameters
	 * @param {Point3D[]} vertexTextures
	 * @private
	 */
	addVertexTextureCoordinate : function( parameters, vertexTextures )
	{
		var p = new Point3D( parameters[ 1 ], parameters[ 2 ], parameters[ 3 ] );

		vertexTextures.push( p );
	}


};



