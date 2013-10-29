"use strict";

/**
 * @constructor
 */

function Material()
{
	this.color		= null;
	this.texture	= null;
}
	
	
Material.prototype = {

	/**
	 * @returns {null|Color}
	 */

	getColor : function()
	{
		return this.color;
	},


	/**
	 * @returns {null|CanvasTexture}
	 */

	getTexture : function()
	{
		return this.texture;
	}
};

