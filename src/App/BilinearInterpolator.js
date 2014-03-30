/*
 * Bilinear interpolation demo
 *
 * Written by Aleksi Asikainen 2014.
 *
 */


/**
 * @param {string} targetCanvasID
 * @param {Number} q11
 * @param {Number} q12
 * @param {Number} q21
 * @param {Number} q22
 * @constructor
 */
function BilinearInterpolator( targetCanvasID, q11, q12, q21, q22 )
{
	this.targetCanvasID			= targetCanvasID;
	this.targetCanvas			= Helper.getElement( this.targetCanvasID );

	this.q11					= q11;
	this.q12					= q12;
	this.q21					= q21;
	this.q22					= q22;

	this.drawing				= false;

	this.texturePixels			= this.targetCanvas.getContext( '2d' ).createImageData( this.targetCanvas.width, this.targetCanvas.height );

	this.initializeLookupTable();
}


BilinearInterpolator.prototype = {

	createMultidimensionalArray : function()
	{
		if( arguments.length > 1 )
		{
			var thisDimension	= new Array( arguments[ 0 ] );
			var slicedArguments	= Array.prototype.slice.call( arguments );

			slicedArguments.shift();

			for( var i = 0; i < thisDimension.length; i++ )
			{
				thisDimension[ i ] = this.createMultidimensionalArray( slicedArguments );
			}

			return thisDimension;
		}
		else if( arguments.length === 1 )
		{
			return new Array( arguments[ 0 ] );
		}

		throw new Error( 'Failed to create the specified array' );
	},


	initializeLookupTable : function()
	{
		var width		= this.targetCanvas.width;
		var height		= this.targetCanvas.height;
		var heightMinus	= height - 1;
		var widthMinus	= width - 1;

		var x1 = 0;
		var x2 = widthMinus;
		var y1 = 0;
		var y2 = heightMinus;

		var oneDivX2MinusX1MulY2MinusY1 = 1 / ( ( x2 - x1 ) * ( y2 - y1 ) ) * 359.0;

		this.lookupTable = this.createMultidimensionalArray( width, height );

		for( var y = 0; y < height; y++ )
		{
			for( var x = 0; x < width; x++ )
			{

				this.lookupTable[ x2 - x ][ y2 - y ] = ( x2 - x ) * ( y2 - y ) * oneDivX2MinusX1MulY2MinusY1;
				this.lookupTable[ x - x1 ][ y2 - y ] = ( x - x1 ) * ( y2 - y ) * oneDivX2MinusX1MulY2MinusY1;
				this.lookupTable[ x2 - x ][ y - y1 ] = ( x2 - x ) * ( y - y1 ) * oneDivX2MinusX1MulY2MinusY1;
				this.lookupTable[ x - x1 ][ y - y1 ] = ( x - x1 ) * ( y - y1 ) * oneDivX2MinusX1MulY2MinusY1;
			}
		}
	},


	draw : function()
	{
		this.drawing	= true;

		var width		= this.targetCanvas.width;
		var height		= this.targetCanvas.height;
		var widthMinus	= width - 1;
		var heightMinus	= height - 1;
		var ptr			= 0;

		var texturePixels	= this.texturePixels;
		var textureData		= texturePixels.data;

		var x1 = 0;
		var x2 = widthMinus;
		var y1 = 0;
		var y2 = heightMinus;

		var normalColor = new NormalizedColor();

		for( var y = 0; y < height; y++ )
		{
			for( var x = 0; x < width; x++ )
			{
				var x2MinusX = x2 - x;
				var y2MinusY = y2 - y;
				var xMinusX1 = x - x1;
				var yMinusY1 = y - y1;

				var hue =
						this.q11 * this.lookupTable[ x2MinusX ][ y2MinusY ] +
						this.q21 * this.lookupTable[ xMinusX1 ][ y2MinusY ] +
						this.q12 * this.lookupTable[ x2MinusX ][ yMinusY1 ] +
						this.q22 * this.lookupTable[ xMinusX1 ][ yMinusY1 ];

				this.hsvToRgb( hue, 1.0, 1.0, normalColor );

				textureData[ ptr++ ] = Math.round( normalColor.r * 255 );
				textureData[ ptr++ ] = Math.round( normalColor.g * 255 );
				textureData[ ptr++ ] = Math.round( normalColor.b * 255 );
				textureData[ ptr++ ] = 255;
			}
		}

		this.targetCanvas.getContext( '2d' ).putImageData( texturePixels, 0, 0 );

		this.drawing = false;
	},


	hsvToRgb : function( hue, saturation, value, targetColor )
	{
		if( saturation == 0 )
		{
			targetColor.set( value, value, value );
			return;
		}

		var sector = hue / 60.0;

		var flooredHue	= Math.floor( sector );
		var factorial	= sector - flooredHue;

		var p = value * ( 1 - saturation );
		var q = value * ( 1 - ( saturation * factorial ) );
		var t = value * ( 1 - ( saturation * ( 1 - factorial ) ) );

		switch( flooredHue )
		{
			case 0:
				targetColor.set( value, t, p );
				break;

			case 1:
				targetColor.set( q, value, p );
				break;

			case 2:
				targetColor.set( p, value, t );
				break;

			case 3:
				targetColor.set( p, q, value );
				break;

			case 4:
				targetColor.set( t, p, value );
				break;

			default:
				targetColor.set( value, p, q );
				break;
		}
	},



	/**
	 * @returns {Boolean}
	 */

	isDrawing : function()
	{
		return this.drawing;
	}

};

