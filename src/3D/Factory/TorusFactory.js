
/**
 * This just generates a torus-shaped mesh
 * @class
 * @link http://gamedev.stackexchange.com/a/16850
 */

var TorusFactory = {
	
	/**
	 * @param {float} outerRadiusX
	 * @param {float} outerRadiusY
	 * @param {float} weight
	 * @param {int} outerSteps
	 * @param {int} innerSteps
	 * @returns {Mesh}
	 * @public
	 */

	generate : function( outerRadiusX, outerRadiusY, weight, outerSteps, innerSteps )
	{
		var torus = new Mesh();
		
		TorusFactory.generateVertices( torus, outerRadiusX, outerRadiusY, weight, outerSteps, innerSteps );
		TorusFactory.generateEdges( torus, outerSteps, innerSteps );
		TorusFactory.generateFaces( torus, outerSteps, innerSteps );

		return torus;
	},
	
	
	/**
	 * @param {Mesh} torus
	 * @param {float} outerRadiusX
	 * @param {float} outerRadiusY
	 * @param {float} weight
	 * @param {int} outerSteps
	 * @param {int} innerSteps
	 * @private
	 */

	generateVertices : function( torus, outerRadiusX, outerRadiusY, weight, outerSteps, innerSteps )
	{
		var outerResolution	= 2 * Math.PI / ( outerSteps );
		var innerResolution	= 2 * Math.PI / ( innerSteps );
		var u				= 0;
		
		// for( var u = 0; u < 2 * Math.PI; u += Math.abs( outerResolution ) )
		for( var ui = 0; ui < outerSteps; ui++ )
		{
			var p = new Point3D( 
					outerRadiusX * Math.cos( u ),
					outerRadiusY * Math.sin( u ),
					0
				);
			
			var w = new Point3D( p.x, p.y, p.z );
			w.normalize();
			
			var v = 0;

			// for( var v = 0; v < 2 * Math.PI; v += Math.abs( innerResolution ) )
			for( var vi = 0; vi < innerSteps; vi++ )
			{
				var q = new Point3D(
						outerRadiusX * w.x + weight * Math.cos( v ) * w.x + 0,
						outerRadiusY * w.y + weight * Math.cos( v ) * w.y + 0,
						outerRadiusX * w.z + weight * Math.cos( v ) * w.z + weight * Math.sin( v )
					);

				torus.addVertex( q );
				
				v += Math.abs( innerResolution );
			}
			
			u += Math.abs( outerResolution );
		}
	},
	
	
	/**
	 * @param {Mesh} torus
	 * @param {int} outerSteps
	 * @param {int} innerSteps
	 * @private
	 */
	
	generateEdges : function( torus, outerSteps, innerSteps )
	{
		var uiCount	= outerSteps;
		var viCount = innerSteps;
		
		for( var ui = 0; ui < uiCount; ui++ )
		{
			for( var vi = 0; vi < viCount; vi++ )
			{
				var thisVertex = ui * viCount + vi;
				
				var nextUI = ui + 1; 
				
				if( nextUI >= uiCount )
				{
					nextUI = 0;
				}
				
				var uiNextVertex = ( nextUI * viCount ) + vi;
				
				torus.addEdge( new Edge( thisVertex, uiNextVertex ) );

				
				
				var nextVI = vi + 1;
				
				if( nextVI >= viCount )
				{
					nextVI = 0;
				}				
								
				var viNextVertex	= ( ui * viCount ) + nextVI;
				
				torus.addEdge( new Edge( thisVertex, viNextVertex ) );
			}
		}				
	},
	
	
	/**
	 * @param {Mesh} torus
	 * @param {int} outerSteps
	 * @param {int} innerSteps
	 * @private
	 */
	
	generateFaces : function( torus, outerSteps, innerSteps )
	{
		/* var material = new SolidColorMaterial( new Color( 0, 192, 0 ) );
		var material2 = new SolidColorMaterial( new Color( 0, 0, 192 ) );*/

		var material	= new TexturedMaterial( new CanvasTexture( 'resources/textures/plastic.jpg' ) );
		material.color	= new Color( 0, 192, 0 );

		var material2	= new TexturedMaterial( new CanvasTexture( 'resources/textures/silver.jpg' ) );
		material2.color	= new Color( 0, 0, 192 );

		
		var uiCount	= outerSteps;
		var viCount = innerSteps;
		
		for( var ui = 0; ui < uiCount; ui++ )
		{
			for( var vi = 0; vi < viCount; vi++ )
			{
				var nextUI = ui + 1; 
				
				if( nextUI >= uiCount )
				{
					// break;
					nextUI = 0;
				}
				
				
				var nextVI = vi + 1;
				
				if( nextVI >= viCount )
				{
					// break;
					nextVI = 0;
				}

				torus.addFace( new Face(
						ui * viCount + vi,
						nextUI * viCount + vi,
						nextUI * viCount + nextVI,
						material,
						new Point3D( 0, 0, 0 ),
						new Point3D( 0, 1, 0 ),
						new Point3D( 1, 0, 0 )
					) );

				torus.addFace( new Face(
						ui * viCount + vi,
						nextUI * viCount + nextVI,
						ui * viCount + nextVI,
						material2,
						new Point3D( 0, 1, 0 ),
						new Point3D( 1, 0, 0 ),
						new Point3D( 1, 1, 0 )
					) );
			}
		}				
	}
	
	
	
	
	
};




