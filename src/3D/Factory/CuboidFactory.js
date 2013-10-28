/**
 * @class
 */

var CuboidFactory = {
	
	/**
	 * @param {float} height
	 * @param {float} length
	 * @param {float} depth
	 * @returns {Mesh}
	 * @public
	 */
	
	generate : function( height, length, depth )
	{
		var cuboid = new Mesh();

		CuboidFactory.generateVertices( cuboid, height, length, depth );
		CuboidFactory.generateEdges( cuboid );
		CuboidFactory.generateFaces( cuboid );
		
		return cuboid;
	},	
	
	
	/**
	 * @param {Mesh} cuboid
	 * @param {float} height
	 * @param {float} length
	 * @param {float} depth
	 * @private
	 */
	
	generateVertices : function( cuboid, height, length, depth )
	{
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
	},
	
	
	/**
	 * @param {Mesh} cuboid
	 * @private
	 */
	
	generateEdges : function( cuboid )
	{
		cuboid.addEdge( new Edge( 0, 1 ) );
		cuboid.addEdge( new Edge( 0, 2 ) );
		cuboid.addEdge( new Edge( 3, 2 ) );
		cuboid.addEdge( new Edge( 3, 1 ) );
		
		cuboid.addEdge( new Edge( 4, 5 ) );
		cuboid.addEdge( new Edge( 4, 6 ) );
		cuboid.addEdge( new Edge( 7, 6 ) );
		cuboid.addEdge( new Edge( 7, 5 ) );
		
		cuboid.addEdge( new Edge( 0, 4 ) );
		cuboid.addEdge( new Edge( 1, 5 ) );
		cuboid.addEdge( new Edge( 2, 6 ) );
		cuboid.addEdge( new Edge( 3, 7 ) );
	},
	
	
	/**
	 * @param {Mesh} cuboid
	 * @private
	 */
	
	generateFaces : function( cuboid )
	{
		var material = new SolidColorMaterial( new Color( 0, 192, 0 ) );
		var material2 = new SolidColorMaterial( new Color( 0, 0, 192 ) );
		
		cuboid.addFace( new Face( 0, 1, 3, material ) );
		cuboid.addFace( new Face( 2, 0, 3, material2 ) );
		
		cuboid.addFace( new Face( 4, 5, 6, material ) );
		cuboid.addFace( new Face( 6, 5, 7, material2 ) );
		
		cuboid.addFace( new Face( 4, 0, 6, material ) );
		cuboid.addFace( new Face( 2, 0, 6, material ) );

		cuboid.addFace( new Face( 1, 3, 7, material ) );
		cuboid.addFace( new Face( 1, 7, 5, material ) );
		
		cuboid.addFace( new Face( 6, 2, 3, material ) );
		cuboid.addFace( new Face( 6, 3, 7, material ) );
		
		cuboid.addFace( new Face( 4, 0, 1, material ) );
		cuboid.addFace( new Face( 5, 4, 1, material ) );
	}
	
	
};