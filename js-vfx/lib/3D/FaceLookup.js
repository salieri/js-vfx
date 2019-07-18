define( [],

function()
{
	'use strict';

	/**
	 * @param {Face} face
	 * @param {Mesh} mesh
	 * @constructor
	 */

	var FaceLookup = function( face, mesh )
	{
		this.face = face;
		this.mesh = mesh;
	};


	return FaceLookup;

} );
