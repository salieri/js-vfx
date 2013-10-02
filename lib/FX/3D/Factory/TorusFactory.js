
/**
 *
 * This function just generates a torus-shaped mesh
 *
 * Implements what is described in http://gamedev.stackexchange.com/a/16850
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

		return torus;
	}
	
};




