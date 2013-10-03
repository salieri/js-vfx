/**
 * 
 * This function just generates a sphere-shaped mesh
 *
 * Implements what is described in: http://stackoverflow.com/a/9787745/844771
 *
 */

var SphereFactory = {
	
	/**
	 * @param {float} radiusX
	 * @param {float} radiusY
	 * @param {float} radiusZ
	 * @param {float} resolution
	 * @returns {Mesh}
	 */

	generate : function( radiusX, radiusY, radiusZ, resolution )
	{
		var sphere = new Mesh();

		for( var inclination = 0; inclination < Math.PI; inclination += Math.abs( resolution ) )
		{
			for( var azimuth = 0; azimuth < 2 * Math.PI; azimuth += Math.abs( resolution ) )
			{
				var p = new Point3D(
						radiusX * Math.sin( inclination ) * Math.cos( azimuth ),
						radiusY * Math.sin( inclination ) * Math.sin( azimuth ),
						radiusZ * Math.cos( inclination )
					);

				sphere.addVertex( p );
			}
		}

		return sphere;
	}
	
};

