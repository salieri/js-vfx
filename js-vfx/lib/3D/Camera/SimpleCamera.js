
define( [ 'Core/Point2D', '3D/Camera/Camera' ],

function( Point2D, Camera )
{
	'use strict';

	/**
	 * @constructor
	 * @extends Camera
	 */

	var SimpleCamera = function()
	{
		this.viewerPosition		= new Point2D( 320, 240 );
		this.perspectiveDepth	= 100;
	};



	SimpleCamera.prototype = new Camera();



	/**
	 * @param {Vertex[]} vertices
	 */

	SimpleCamera.prototype.transform = function( vertices )
	{
		var l = vertices.length;

		for( var i = 0; i < l; i++ )
		{
			var vertex		= vertices[ i ];
			var sourcePoint = vertex.transformed;
			var targetPoint	= vertex.cameraTransformed;

			targetPoint.x = sourcePoint.x;
			targetPoint.y = sourcePoint.y;
			targetPoint.z = sourcePoint.z;
		}
	};


	/**
	 * @param {Vertex[]} vertices
	 */

	SimpleCamera.prototype.project = function( vertices )
	{
		var l				= vertices.length;
		// var viewerPosition	= this.viewerPosition;

		for( var i = 0; i < l; i++ )
		{
			var vertex		= vertices[ i ];
			var sourcePoint = vertex.cameraTransformed;
			var targetPoint	= vertex.cameraProjected;

			var pd			= this.perspectiveDepth / sourcePoint.z;

			targetPoint.x	= ( sourcePoint.x * pd ) + this.viewerPosition.x;
			targetPoint.y	= ( sourcePoint.y * pd ) + this.viewerPosition.y;
		}
	};


	return SimpleCamera;

} );