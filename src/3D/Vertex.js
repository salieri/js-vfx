
define( [ 'Core/Point2D', 'Core/Point3D', 'Core/Vector3D', '3D/Light/LightData' ],

function( Point2D, Point3D, Vector3D, LightData )
{
	'use strict';

	/**
	 * @param {Point3D} point
	 * @constructor
	 */
	var Vertex = function( point )
	{
		this.origin				= point;

		this.normal				= new Vector3D( 0, 0, 0 );
		this.transformed		= new Point3D( 0, 0, 0 );
		this.cameraTransformed	= new Point3D( 0, 0, 0 );
		this.cameraProjected	= new Point2D( 0, 0 );

		this.lightData			= new LightData();
		this.faces				= [];
	};

	return Vertex;
} );


