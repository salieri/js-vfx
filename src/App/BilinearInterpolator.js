/*
 * Bilinear interpolation demo
 *
 * Written by Aleksi Asikainen 2014.
 *
 * Based on algorithm described in http://en.wikipedia.org/wiki/Bilinear_interpolation
 *
 */


define( [ 'Core/App', 'Core/NormalizedColor' ],

function( App, NormalizedColor )
{
	'use strict';

	/**
	 * @param {string} targetCanvasId
	 * @param {number} q11
	 * @param {number} q12
	 * @param {number} q21
	 * @param {number} q22
	 * @constructor
	 * @extends {App}
	 */
	var BilinearInterpolator = function ( targetCanvasId, q11, q12, q21, q22 )
	{
		App.call( this, targetCanvasId );

		this.q11					= q11;
		this.q12					= q12;
		this.q21					= q21;
		this.q22					= q22;

		this.initializeLookupTable();
	};



	BilinearInterpolator.prototype = new App();



	/**
	 * @private
	 * @returns {Array}
	 */
	BilinearInterpolator.prototype.createMultidimensionalArray = function()
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
	};


	/**
	 * @private
	 */
	BilinearInterpolator.prototype.initializeLookupTable = function()
	{
		var width		= this.canvas.width;
		var height		= this.canvas.height;
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
	};


	BilinearInterpolator.prototype.draw = function()
	{
		this.startDrawing();

		var width		= this.canvas.width;
		var height		= this.canvas.height;
		var widthMinus	= width - 1;
		var heightMinus	= height - 1;
		var ptr			= 0;

		var canvasPixels	= this.canvasPixels;
		var canvasData		= canvasPixels.data;

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

				NormalizedColor.hsvToRgb( hue, 1.0, 1.0, normalColor );

				canvasData[ ptr++ ] = Math.round( normalColor.r * 255 );
				canvasData[ ptr++ ] = Math.round( normalColor.g * 255 );
				canvasData[ ptr++ ] = Math.round( normalColor.b * 255 );
				canvasData[ ptr++ ] = 255;
			}
		}

		this.canvas.getContext( '2d' ).putImageData( canvasPixels, 0, 0 );

		this.endDrawing();
	};


	return BilinearInterpolator;

} );

