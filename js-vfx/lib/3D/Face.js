
define( [ 'Core/Point3D', 'Core/Vector3D', '3D/Light/LightData', '3D/Material/SolidColorMaterial' ],

function( Point3D, Vector3D, LightData, SolidColorMaterial )
{
	'use strict';

	/**
	 * Triad face
	 *
	 * @param {int} a
	 * @param {int} b
	 * @param {int} c
	 * @param {Material} [material]
	 * @param {Point3d} [uvA]
	 * @param {Point3d} [uvB]
	 * @param {Point3d} [uvC]
	 * @constructor
	 */
	var Face = function( a, b, c, material, uvA, uvB, uvC )
	{
		this.a	= a;
		this.b	= b;
		this.c	= c;

		this.uvA	= uvA || new Point3D();
		this.uvB	= uvB || new Point3D();
		this.uvC	= uvC || new Point3D();

		this.order		= 0;
		this.visible	= false;

		this.material		= material || new SolidColorMaterial();
		this.normal			= new Vector3D();
		this.position		= new Point3D();
		this.lightData		= new LightData();
	};

	Face.prototype = {



	};


	return Face;

} );
