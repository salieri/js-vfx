

/**
 * @param {string} src URI/URL to texture resource
 * @constructor
 */

function EmptyTexture( canvasElementId )
{
	this.canvas		= Helper.getElement( canvasElementId );
	this.context	= this.canvas.getContext( '2d' );

	this.create();

	this.loaded		= true;
}


EmptyTexture.prototype = {

	/**
	 * @return {int}
	 */

	getWidth : function()
	{
		return this.width;
	},


	/**
	 * @return {int}
	 */

	getHeight : function()
	{
		return this.height;
	},


	/**
	 * @return {CanvasPixelArray}
	 **/

	getPixels : function()
	{
		return this.data;
	},


	/**
	 * @param {CanvasPixelArray} pixels
	 */

	 setPixels : function( pixels )
	 {
	 	this.context.putImageData( pixels, 0, 0 );
	 },


	create : function()
	{
		this.data	= this.context.createImageData( this.canvas.width, this.canvas.height );

		this.width	= this.canvas.width;
		this.height	= this.canvas.height;
	},


	destroy : function()
	{
		this.loaded		= false;
		this.context	= null;
		this.canvas		= null;
		this.width		= 0;
		this.height		= 0;
		this.data		= null;
	}
	
};

