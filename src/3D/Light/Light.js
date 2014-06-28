
define( [ 'Core/Point3D' ],

function( Point3D )
{
	'use strict';

	/**
	 * Creates a new light
	 * @constructor
	 */

	var Light = function()
	{
		this.position = new Point3D();
	};


	Light.prototype = {


		/**
		 * @param {Vector3D} viewerDirection
		 * @param {Point3D} normal3DPosition
		 * @param {Vector3D} normal
		 * @param {LightData} targetLightData
		 * @abstract
		 */
		calculateLightData : function( viewerDirection, normal3DPosition, normal, targetLightData ) // jshint ignore:line
		{
			// do nothing
		}

	};

	return Light;

} );

