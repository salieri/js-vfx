require( [ '../src/loader' ],
function()
{
	'use strict';

	require( [
			'../camera/ui',

			'Core/Color', 'Core/Point2D', 'Core/Draw', 'Core/Surface', 'jquery', 'jqueryui',

			'3D/Scene',

			'3D/Renderer/VertexRenderer', '3D/Renderer/WireframeRenderer', '3D/Renderer/FlatRenderer',
			'3D/Renderer/FlatShaderRenderer', '3D/Renderer/GouraudShaderRenderer', '3D/Renderer/TextureRenderer',

			'3D/Factory/TorusFactory', '3D/Factory/ObjFactory', '3D/Factory/CuboidFactory', '3D/Factory/SphereFactory',

			'3D/Camera/MovableCamera',

			'3D/Light/OmniLight',

			'Core/NormalizedColor', 'Core/Point3D'
		],

	function( // jshint ignore:line
			ui,
			Color, Point2D, Draw, Surface, $, jqueryui,
			Scene,
			VertexRenderer, WireframeRenderer, FlatRenderer, FlatShaderRenderer, GouraudShaderRenderer, TextureRenderer,
			TorusFactory, ObjFactory, CuboidFactory, SphereFactory,
			MovableCamera,
			OmniLight,
			NormalizedColor, Point3D
	)
	{
		/**
		 * @type Surface
		 */
		var surface;

		/**
		 * @type Scene
		 */
		var scene;

		/**
		 * @type Mesh
		 */
		var torus;
		var teapot;
		var sphere;
		var cube;

		/**
		 * @type Renderer
		 */
		var renderer;

		/**
		 * @type Camera
		 */
		var camera;

		/**
		 * @

		/**
		 * @type Light
		 */
		var light;
		var light2;



		var rotateMesh = function()
		{
			torus.rotation.addByVal( 0.01 );
			teapot.rotation.addByVal( 0.01 );
			cube.rotation.addByVal( 0.01 );
			sphere.rotation.addByVal( 0.01 );

			Draw.beginPaint();
				scene.render();
			Draw.endPaint();

			$( '#sceneFPS' ).html( scene.renderFPS );
		};


		var setRenderer = function( rendererName )
		{
			if( scene === null )
			{
				return;
			}

			switch( rendererName )
			{
				case 'vertex':
					Draw.color = new Color( 88, 88, 255 );
					renderer = new VertexRenderer();
					break;

				case 'wireframe':
					Draw.color = new Color( 88, 88, 255 );
					renderer = new WireframeRenderer();
					break;

				case 'solid':
					renderer = new FlatRenderer();
					break;

				case 'flat':
					renderer = new FlatShaderRenderer();
					break;

				case 'gouraud':
					renderer = new GouraudShaderRenderer();
					break;

				case 'texture':
					renderer = new TextureRenderer();
					break;
			}

			scene.addRenderer( renderer, true );

			$( '#renderer-' + rendererName ).siblings().removeClass( 'active' );
			$( '#renderer-' + rendererName ).addClass( 'active' );
		};


		var setObject = function( objectName )
		{
			if( scene === null )
			{
				return;
			}

			scene.clearMeshes();


			switch( objectName )
			{
				case 'cube':
					scene.addMesh( cube );
					break;

				case 'sphere':
					scene.addMesh( sphere );
					break;

				case 'torus':
					scene.addMesh( torus );
					break;

				case 'teapot':
					scene.addMesh( teapot );
					break;
			}

			$( '#object-' + objectName ).siblings().removeClass( 'active' );
			$( '#object-' + objectName ).addClass( 'active' );
		};


		var init = function()
		{
			surface		= new Surface( 'surface', false );

			Draw.setSurface( surface );
			Draw.bgColor.set( 220, 220, 220 );
			Draw.color.set( 0, 0, 0 );


			scene		= new Scene();

			torus		= TorusFactory.generate( 500, 500, 250, 15, 9 );
			teapot		= ObjFactory.load( 'resources/objects/teapot.obj', scene );
			cube		= CuboidFactory.generate( 500, 500, 500 );
			sphere		= SphereFactory.generate( 500, 500, 500, 10 );

			torus.position.z	= -1200;
			teapot.position.z	= -1200;
			cube.position.z		= -1200;
			sphere.position.z	= -1200;

			teapot.scale.set( 800, 800, 800 );

			// mesh		= CuboidFactory.generate( 250, 250, 250 );


			camera		= new MovableCamera();
			// renderer	= new VertexRenderer();
			// renderer	= new WireframeRenderer();
			// renderer	= new FlatRenderer();
			// renderer	= new FlatShaderRenderer();
			// renderer	= new GouraudShaderRenderer();

			setRenderer( 'flat' );
			setObject( 'torus' );

			light				= new OmniLight( new Point3D( -250, 0, -800 ), new NormalizedColor( 1, 1, 1 ) );
			light.diffusePower	= 20000;

			// light2			= new OmniLight( new Point3D( +350, 0, -1000 ), new NormalizedColor( 1, 1, 1 ) );
			light2				= new OmniLight( new Point3D( 0, 0, -1200 ), new NormalizedColor( 1, 1, 1 ) );
			light2.diffusePower	= 20000;

			// scene.addMesh( torus );
			scene.addCamera( camera );
			scene.addRenderer( renderer );

			scene.addLight( light );
			scene.addLight( light2 );

			/* Draw.beginPaint();
				scene.render();
			Draw.endPaint(); */

			ui.init( setRenderer, setObject );


			setInterval(
					function()
					{
						if( surface.isDrawing() === false )
						{
							rotateMesh();
						}
					},
					25
				);
		};


		init();
	} );
} );