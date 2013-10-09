
/**
 * @param {string} src URI/URL to texture resource
 * @returns {CanvasTexture}
 */

function CanvasTexture( src ) 
{
	this.canvas		= this.create();
	this.context	= this.canvas.getContext( '2d' );
	this.loaded		= false;

	this.image		= new Image();
	this.image.src	= src;
	

	// Let's update stuff once the image has loaded
	var me			= this;
	
	this.image.onload = function()
		{
			me.loaded			= true;
			me.canvas.width		= me.image.width;
			me.canvas.height	= me.image.height;
			
			if( typeof( me.onload ) === 'function' )
			{
				me.onload();
			}
		};
}


CanvasTexture.prototype = {

	/**
	 * @return {int}
	 */	 	

	getWidth : function()
	{
		return this.image.width;
	},
	
	
	/**
	 * @return {int}
	 */	 	
	
	getHeight : function()
	{
		return this.image.height;
	},
	
	
	/**
	 * @return {CanvasPixelArray}
	 **/	 	
	
	getPixels : function()
	{
		this.context.drawImage( this.image, 0, 0 );
		return this.context.getImageData( 0, 0, this.getWidth(), this.getHeight() );
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
		var canvas	= Helper.createElement( 'canvas' );
		
		canvas.width	= 1;
		canvas.height	= 1;
		
		return canvas;
	},
	
	
	destroy : function()
	{
		Helper.removeElement( this.canvas );
		
		this.loaded		= false;
		this.image		= null;
		this.context	= null;
		this.canvas		= null;
	}
	
};

