
define( [ '3D/FaceSortPile', '3D/Ambience' ],

function( FaceSortPile, Ambience )
{
	'use strict';

	/**
	 * @constructor
	 */
	var Scene = function()
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
	};


	Scene.prototype = {

		/**
		 * @param {Camera} camera
		 * @public
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
		 * @param {Boolean} [setAsActive]
		 * @public
		 */
		addRenderer : function( renderer, setAsActive )
		{
			this.renderers.push( renderer );

			if( ( this.activeRenderer === null ) || ( setAsActive === true ) )
			{
				this.activeRenderer = renderer;
			}
		},


		/**
		 * @param {Mesh} mesh
		 * @public
		 */
		addMesh : function( mesh )
		{
			this.meshes.push( mesh );

			this.forceReinitSort = true;
		},


		/**
		 * @param {Light} light
		 * @public
		 */
		addLight : function( light )
		{
			this.lights.push( light );
		},


		/**
		 * @param {String} name
		 * @returns {int|null}
		 * @public
		 */
		findMeshIndex : function( name )
		{
			for( var i = 0; i < this.meshes.length; i++ )
			{
				if( this.meshes[ i ].name === name )
				{
					return i;
				}
			}

			return null;
		},


		/**
		 * @param {String} name
		 * @public
		 */
		removeMesh : function( name )
		{
			var i = this.findMeshIndex( name );

			if( i !== null )
			{
				this.meshes.splice( i, 1 );
			}
		},


		/**
		 * @param {Renderer} [renderer]
		 * @public
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

					this.meshes[ i ].cull( this.activeCamera );
				}
			}


			this.faceSortPile.sort();


			renderer.draw( this );

			var renderComplete = new Date();

			this.renderFrameCount++;
			this.renderTime	+= ( renderComplete.getTime() - renderStart.getTime() ) / 1000.0;
			this.renderFPS	= this.renderFrameCount / this.renderTime;
		},


		/**
		 * @public
		 */
		clearMeshes : function()
		{
			this.meshes = [];
			this.faceSortPile.reInit();
		}
	};


	return Scene;
} );
