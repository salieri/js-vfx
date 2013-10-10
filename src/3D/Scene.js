
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
	 * @type FaceSortPile
	 */
	this.faceSortPile	= new FaceSortPile( this );
	
	
	this.ambience		= new Ambience();
	
	
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
	
	this.forceReinitSort	= true;
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
		
		this.forceReinitSort = true;
	},
	
	
	/**
	 * @param {Light} light
	 */
	addLight : function( light )
	{
		this.lights.push( light );
	},
	
	
	/**
	 * 
	 * @param {type} renderer
	 * @returns {undefined}
	 */

	
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
		

		// transform, project, and calculate normals
		for( var i = 0; i < this.meshes.length; i++ )
		{
			if( this.meshes[ i ].visible === true )
			{
				this.meshes[ i ].transformOrigin();
				this.meshes[ i ].transformCamera( this.activeCamera );
				this.meshes[ i ].project( this.activeCamera );

				this.meshes[ i ].calculateFaceNormals();
				this.meshes[ i ].calculateVertexNormals();
				this.meshes[ i ].calculateFaceLightData( this, this.activeCamera );
				this.meshes[ i ].calculateVertexLightData( this, this.activeCamera );
			}
		}
		
		
		if( this.faceSortPile.forceInit === true )
		{
			this.faceSortPile.init();
		}
		
		this.faceSortPile.sort();
				
			
		renderer.draw( this );
		
		var renderComplete = new Date();
				
		this.renderFrameCount++;
		this.renderTime	+= ( renderComplete.getTime() - renderStart.getTime() ) / 1000.0;
		this.renderFPS	= this.renderFrameCount / this.renderTime;
	}




	
};

