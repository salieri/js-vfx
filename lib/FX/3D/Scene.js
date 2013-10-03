
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
	
	
	this.renderTime			= 0;
	this.renderFrameCount	= 0;
	this.renderFPS			= 0.00;
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
		var renderStart = new Date();
		
		
		for( var i = 0; i < this.meshes.length; i++ )
		{
			if( this.meshes[ i ].visible === true )
			{
				this.meshes[ i ].transformOrigin();
				this.meshes[ i ].transformCamera( this.activeCamera );
				this.meshes[ i ].project( this.activeCamera );

				this.meshes[ i ].drawVertices();
			}
		}
		
		
		var renderComplete = new Date();
				
		this.renderFrameCount++;
		this.renderTime	+= ( renderComplete.getTime() - renderStart.getTime() ) / 1000.0;
		this.renderFPS	= this.renderFrameCount / this.renderTime;
	}

	
};





