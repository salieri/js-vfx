

define( [],

function()
{
	'use strict';
	
	var Texture = function()
	{
		this.loaded		= false;
		this.canvas		= null;
		this.context	= null;
		this.data		= null;
	};


	Texture.prototype = {

		/**
		 * @return {int}
		 * @abstract
		 * @public
		 */
		getWidth : function()
		{
			return 0;
		},


		/**
		 * @return {int}
		 * @abstract
		 * @public
		 */
		getHeight : function()
		{
			return 0;
		},


		/**
		 * @return {CanvasPixelArray}
		 * @abstract
		 * @public
		 **/
		getPixels : function()
		{
			return null;
		},


		/**
		 * @param {CanvasPixelArray} pixels
		 * @public
		 */
		 setPixels : function( pixels )
		 {
			this.context.putImageData( pixels, 0, 0 );
		 },


		/**
		 * @public
		 * @abstract
		 */
		create : function()
		{
		},


		/**
		 * @public
		 * @abstract
		 */
		destroy : function()
		{
		}


	};


	return Texture;
} );
