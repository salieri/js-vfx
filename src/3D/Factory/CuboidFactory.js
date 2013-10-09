
var CuboidFactory = {
	
	/**
	 * @param {float} height
	 * @param {float} length
	 * @param {float} depth
	 * @returns {Mesh}
	 */
	
	generate : function( height, length, depth )
	{
		var cuboid = new Mesh();
		
		var l2 = length / 2;
		var h2 = height / 2;
		var d2 = depth / 2;
		
		cuboid.addVertex( new Point3D( -l2, -h2, -d2 ) );
		cuboid.addVertex( new Point3D( -l2, +h2, -d2 ) );
		cuboid.addVertex( new Point3D( +l2, -h2, -d2 ) );
		cuboid.addVertex( new Point3D( +l2, +h2, -d2 ) );
		
		cuboid.addVertex( new Point3D( -l2, -h2, +d2 ) );
		cuboid.addVertex( new Point3D( -l2, +h2, +d2 ) );
		cuboid.addVertex( new Point3D( +l2, -h2, +d2 ) );
		cuboid.addVertex( new Point3D( +l2, +h2, +d2 ) );
		
		return cuboid;
	}		
	
};