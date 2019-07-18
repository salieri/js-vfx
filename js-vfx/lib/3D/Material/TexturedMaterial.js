
define( [ '3D/Material/Material' ],

function( Material )
{
	'use strict';

	/**
	 * @param {CanvasTexture} [texture]
	 * @extends Material
	 * @constructor
	 */
	var TexturedMaterial = function( texture )
	{
		this.texture	= texture;
		this.color		= null;
	};


	TexturedMaterial.prototype = new Material();


	return TexturedMaterial;

} );
