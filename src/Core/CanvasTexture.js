

define( [ 'Core/Texture', 'Core/Helper', 'Core/VirtualSurface' ],

function( Texture, Helper, VirtualSurface )
{
	'use strict';

	/**
	 * @param {string} src URI/URL to texture resource
	 * @constructor
	 * @extends {Texture}
	 */
	var CanvasTexture = function( src )
	{
		Texture.call( this );

		this.canvas		= this.create();
		this.context	= this.canvas.getContext( '2d' );
		this.loaded		= false;

		this.image				= new Image();
		this.image.crossOrigin	= 'Anonymous';
		this.image.src			= src;
		this.wasDrawn			= false;


		// Let's update stuff once the image has loaded
		var me			= this;

		this.image.onload = function()
			{
				me.loaded			= true;
				me.canvas.width		= me.image.width;
				me.canvas.height	= me.image.height;
				me.data				= me.getPixels().data;
				me.wasDrawn			= false;

				me.virtualSurface	= new VirtualSurface( me.image.width, me.image.height, me.data );

				if( typeof( me.onload ) === 'function' )
				{
					me.onload();
				}
			};
	};



	CanvasTexture.prototype = new Texture();


	CanvasTexture.prototype.getWidth = function()
	{
		return this.image.width;
	};

	
	CanvasTexture.prototype.getHeight = function()
	{
		return this.image.height;
	};
	
	
	CanvasTexture.prototype.getPixels = function()
	{
		if( this.wasDrawn === false )
		{
			this.context.drawImage( this.image, 0, 0 );
			this.wasDrawn = true;
		}

		return this.context.getImageData( 0, 0, this.getWidth(), this.getHeight() );
	};
	
	
	CanvasTexture.prototype.create = function()
	{
		var canvas	= Helper.createElement( 'canvas' );
		
		canvas.width	= 1;
		canvas.height	= 1;
		
		return canvas;
	};
	
	
	CanvasTexture.prototype.destroy = function()
	{
		Helper.removeElement( this.canvas );
		
		this.loaded		= false;
		this.image		= null;
		this.context	= null;
		this.canvas		= null;
	};


	return CanvasTexture;
} );

