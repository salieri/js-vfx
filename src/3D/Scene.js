
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


	/**
	 * @type Renderer[]
	 */
	
	this.renderers		= [];
	
	
	/**
	 * @type Camera
	 */
	
	this.activeCamera	= null;
	
	
	/**
	 * @type Renderer
	 */
	this.activeRenderer		= null;
	
	
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
	 * @param {Renderer} renderer
	 */
	addRenderer : function( renderer )
	{
		this.renderers.push( renderer );
		
		if( this.activeRenderer === null )
		{
			this.activeRenderer = renderer;
		}
	},

	
	/**
	 * @param {Mesh} mesh
	 */
	addMesh : function( mesh )
	{
		this.meshes.push( mesh );
	},

	
	/**
	 * @param {Renderer} renderer
	 */
	
	render : function( renderer )
	{
		if( !renderer )
		{
			renderer = this.activeRenderer;
		}
		
		
		var renderStart = new Date();
		
		
		for( var i = 0; i < this.meshes.length; i++ )
		{
			if( this.meshes[ i ].visible === true )
			{
				this.meshes[ i ].transformOrigin();
				this.meshes[ i ].transformCamera( this.activeCamera );
				this.meshes[ i ].project( this.activeCamera );
			}
		}
			
		renderer.draw( this );
		
		var renderComplete = new Date();
				
		this.renderFrameCount++;
		this.renderTime	+= ( renderComplete.getTime() - renderStart.getTime() ) / 1000.0;
		this.renderFPS	= this.renderFrameCount / this.renderTime;
	}

	
};

