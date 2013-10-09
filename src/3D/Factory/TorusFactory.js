
/**
 *
 * This just generates a torus-shaped mesh
 *
 * @link http://gamedev.stackexchange.com/a/16850
 *
 */

var TorusFactory = {
	
	/**
	 * @param {float} radiusX
	 * @param {float} radiusY
	 * @param {float} radiusZ
	 * @param {float} weight
	 * @param {float} resolution
	 * @returns {Mesh}
	 */

	generate : function( radiusX, radiusY, radiusZ, weight, resolution )
	{
		var torus = new Mesh();
		
		TorusFactory.generateVertices( torus, radiusX, radiusY, radiusZ, weight, resolution );
		TorusFactory.generateEdges( torus, resolution );

		return torus;
	},
	
	
	/**
	 * @param {Mesh} torus
	 * @param {float} radiusX
	 * @param {float} radiusY
	 * @param {float} radiusZ
	 * @param {float} weight
	 * @param {float} resolution
	 */

	generateVertices : function( torus, radiusX, radiusY, radiusZ, weight, resolution )
	{
		for( var u = 0; u < 2 * Math.PI; u += Math.abs( resolution ) )
		{
			var p = new Point3D( 
					radiusX * Math.cos( u ),
					radiusY * Math.sin( u ),
					0
				);
			
			var w = new Point3D( p.x, p.y, p.z );
			w.normalize();

			for( var v = 0; v < 2 * Math.PI; v += Math.abs( resolution ) )
			{
				var q = new Point3D(
						radiusX * w.x + weight * Math.cos( v ) * w.x + 0,
						radiusY * w.y + weight * Math.cos( v ) * w.y + 0,
						radiusZ * w.z + weight * Math.cos( v ) * w.z + weight * Math.sin( v )
					);

				torus.addVertex( q );
			}
		}
	},
	
	
	/**
	 * @param {Mesh} torus
	 * @param {float} resolution
	 */
	
	generateEdges : function( torus, resolution )
	{
		var uiCount	= Math.floor( 2 * Math.PI / Math.abs( resolution ) );
		var viCount = Math.floor( 2 * Math.PI / Math.abs( resolution ) );
		
		
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
				
				if( nextVI > viCount )
				{
					nextVI = 0;
				}				
								
				var viNextVertex	= ( ui * viCount ) + nextVI;
				
				torus.addEdge( new Edge( thisVertex, viNextVertex ) );
			}
		}				
	}
	
	
};




