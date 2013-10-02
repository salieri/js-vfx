
function Scene()
{
	/**
	 * @type Mesh[]
	 */	
	this.meshes			= [];
	
	/**
	 * @type Camera[]
	 */
	this.cameras		= [];
	
	
	/**
	 * @type Light[]
	 */
	this.lights			= [];
	
	
	/**
	 * @type Material[]
	 */
	this.materials		= [];
	
	
	this.activeCamera	= null;	
}


Scene.prototype = {
	
	/**
	 * @param {Camera} camera
	 */
	addCamera : function( camera )
	{
		this.cameras.push( camera );
		
		if( this.activeCamera === null )
		{
			this.activeCamera = camera;
		}
	},

	
	/**
	 * @param {Mesh} mesh
	 */
	addMesh : function( mesh )
	{
		this.meshes.push( mesh );
	},
	
	
	render : function()
	{
		for( var i = 0; i < this.meshes.length; i++ )
		{
			this.meshes[ i ].transformOrigin();
			this.meshes[ i ].transform3D( this.activeCamera );
			this.meshes[ i ].project2D( this.activeCamera );
			
			this.meshes[ i ].drawVertices();
		}
	}

	
};





