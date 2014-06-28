

define( [ 'Core/Helper', 'Core/Texture' ],

function( Helper, Texture )
{
	/**
	 * @param {string} canvasElementId Name of the canvas element to be used
	 * @constructor
	 * @extends {Texture}
	 */
	var EmptyTexture = function( canvasElementId )
	{
		Texture.call( this );

		this.canvas		= Helper.getElement( canvasElementId );
		this.context	= this.canvas.getContext( '2d' );

		this.create();

		this.loaded		= true;
	};


	EmptyTexture.prototype = new Texture();


	EmptyTexture.prototype.getWidth = function()
	{
		return this.width;
	};


	EmptyTexture.prototype.getHeight = function()
	{
		return this.height;
	};


	EmptyTexture.prototype.getPixels = function()
	{
		return this.data;
	};


	EmptyTexture.prototype.create = function()
	{
		this.data	= this.context.createImageData( this.canvas.width, this.canvas.height );

		this.width	= this.canvas.width;
		this.height	= this.canvas.height;
	};


	EmptyTexture.prototype.destroy = function()
	{
		this.loaded		= false;
		this.context	= null;
		this.canvas		= null;
		this.width		= 0;
		this.height		= 0;
		this.data		= null;
	};



	return EmptyTexture;

} );

