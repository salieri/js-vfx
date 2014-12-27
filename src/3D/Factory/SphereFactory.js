
define( [
		'Core/Point3D', 'Core/Color', 'Core/CanvasTexture',
		'3D/Mesh', '3D/Edge', '3D/Face', '3D/Material/TexturedMaterial'
	],

function(
		Point3D, Color, CanvasTexture,
		Mesh, Edge, Face, TexturedMaterial
	)
{
	'use strict';

	/**
	 * This just generates a sphere-shaped mesh
	 * @link http://stackoverflow.com/a/9787745/844771
	 * @namespace
	 */
	var SphereFactory = {

		/**
		 * @param {float} radiusX
		 * @param {float} radiusY
		 * @param {float} radiusZ
		 * @param {int} steps
		 * @returns {Mesh}
		 * @public
		 */
		generate : function( radiusX, radiusY, radiusZ, steps )
		{
			var sphere		= new Mesh();
			var uSteps		= steps;
			var vSteps		= steps * 2;

			this.generateVertices( radiusX, radiusY, radiusZ, sphere, uSteps, vSteps );
			this.generateEdges( sphere, uSteps, vSteps );
			this.generateFaces( sphere, uSteps, vSteps );

			return sphere;
		},


		/**
		 * @param {int|float|Number} radiusX
		 * @param {int|float|Number} radiusY
		 * @param {int|float|Number} radiusZ
		 * @param {Mesh} sphere
		 * @param {int|Number} uSteps
		 * @param {int|Number} vSteps
		 * @private
		 */
		generateVertices : function( radiusX, radiusY, radiusZ, sphere, uSteps, vSteps )
		{
			var resolution	= Math.PI / ( uSteps );
			var inclination	= 0;

			for( var u = 0; u <= uSteps; u++ )
			{
				var azimuth = 0;

				for( var v = 0; v <= vSteps; v++ )
				{
					var p = new Point3D(
							radiusX * Math.sin( inclination ) * Math.cos( azimuth ),
							radiusY * Math.sin( inclination ) * Math.sin( azimuth ),
							radiusZ * Math.cos( inclination )
					);

					sphere.addVertex( p );

					azimuth += Math.abs( resolution );
				}

				inclination += Math.abs( resolution );
			}
		},


		/**
		 * @param {Mesh} sphere
		 * @param {int|Number} uSteps
		 * @param {int|Number} vSteps
		 * @private
		 */
		generateEdges : function( sphere, uSteps, vSteps )
		{
			for( var u = 0; u < uSteps; u++ )
			{
				for( var v = 0; v < vSteps; v++ )
				{
					var thisVertex = u * ( vSteps + 1 ) + v;

					var nextUI = u + 1;

					if( nextUI > uSteps )
					{
						nextUI = 0;
					}

					var uiNextVertex = ( nextUI * ( vSteps + 1 ) ) + v;

					sphere.addEdge( new Edge( thisVertex, uiNextVertex ) );


					var nextVI = v + 1;

					if( nextVI > vSteps )
					{
						nextVI = 0;
					}

					var viNextVertex	= ( u * ( vSteps + 1 ) ) + nextVI;

					sphere.addEdge( new Edge( thisVertex, viNextVertex ) );
				}
			}
		},


		/**
		 * @param {Mesh} sphere
		 * @param {int|Number} uSteps
		 * @param {int|Number} vSteps
		 * @private
		 */
		generateFaces : function( sphere, uSteps, vSteps )
		{
			var material	= new TexturedMaterial( new CanvasTexture( 'resources/textures/chrome-4.jpg' ) );
			material.color	= new Color( 0, 192, 0 );

			var material2	= new TexturedMaterial( new CanvasTexture( 'resources/textures/chrome-4.jpg' ) );
			material2.color	= new Color( 0, 0, 192 );


			for( var u = 0; u < uSteps; u++ )
			{
				for( var v = 0; v < vSteps; v++ )
				{
					var nextUI = u + 1;

					if( nextUI > uSteps )
					{
						// break;
						nextUI = 0;
					}


					var nextVI = v + 1;

					if( nextVI > vSteps )
					{
						// break;
						nextVI = 0;
					}

					sphere.addFace( new Face(
							u * ( vSteps + 1 ) + v,
							nextUI * ( vSteps + 1 ) + v,
							nextUI * ( vSteps + 1 ) + nextVI,
							material,
							new Point3D( 0, 0, 0 ),
							new Point3D( 0, 1, 0 ),
							new Point3D( 1, 0, 0 )
					) );

					sphere.addFace( new Face(
							u * ( vSteps + 1 ) + v,
							nextUI * ( vSteps + 1 ) + nextVI,
							u * ( vSteps + 1 ) + nextVI,
							material2,
							new Point3D( 0, 1, 0 ),
							new Point3D( 1, 0, 0 ),
							new Point3D( 1, 1, 0 )
					) );
				}
			}
		}

	};

	return SphereFactory;

} );
