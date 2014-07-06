/*
 * Mandelbrot demo
 *
 * @link http://en.wikipedia.org/wiki/Mandelbrot_set
 *
 * Written by Aleksi Asikainen 2014.
 */

define( [ 'Core/App', 'Core/NormalizedColor', 'Core/Color' ],

function( App, NormalizedColor, Color )
{
	'use strict';

	/**
	 * @param {string} targetCanvasId
	 * @constructor
	 * @extends {App}
	 */
	var Mandelbrot = function( targetCanvasId )
	{
		App.call( this, targetCanvasId );

		this.maxIterations	= 40;
		this.zoom			= 1;

		this.calculatePalette();
	};


	Mandelbrot.prototype = new App();


	Mandelbrot.prototype.draw = function()
	{
		this.startDrawing();

		var data	= this.virtualSurface.getData();
		var width	= this.virtualSurface.getWidth();
		var height	= this.virtualSurface.getHeight();
		var ptr		= 0;

		var maxIterations	= this.maxIterations;

		var scaleX = 3.5 / this.zoom;
		var scaleY = 2.0 / this.zoom;

		var yAdder = -this.zoom / 40;
		var xAdder = -this.zoom / 24;

		var precalcColors = this.precalcColors;

		var xPos = ( -0.75 + xAdder ) - ( scaleX / 2 );
		var yPos = ( 0 + yAdder ) - ( scaleY / 2 );


		for( var py = 0; py < height; py++ )
		{
			for( var px = 0; px < width; px++ )
			{
				var x0				= xPos + ( px / width ) * scaleX,
					y0				= yPos + ( py / height ) * scaleY,
					x				= 0.0,
					y				= 0.0,
					xx				= x * x,
					yy				= y * y,
					iteration		= 0;

				while( ( xx + yy < 4 ) && ( iteration < maxIterations ) )
				{
					y = 2 * x * y + y0;
					x = xx - yy + x0;

					iteration++;

					xx = x * x;
					yy = y * y;
				}

				// var col		= Math.max( 0, Math.min( 255, Math.round( iteration / maxIterations * 255 ) ) );
				var colIndex	= Math.max( 0, Math.min( maxIterations - 1, iteration ) );
				var color		= precalcColors[ colIndex ];

				data[ ptr++ ] = color.r;
				data[ ptr++ ] = color.g;
				data[ ptr++ ] = color.b;
				ptr++;
			}
		}

console.log( "Drew" );
		this.endDrawing( true );
	};


	Mandelbrot.prototype.calculatePalette = function()
	{
		this.precalcColors	= new Array( this.maxIterations );
		var degrees			= 160;
		var degreeOffset	= 45;


		for( var i = 0; i < this.maxIterations; i++ )
		{
			var normal	= Math.cos( i / this.maxIterations * Math.PI );
			var hue		= ( normal * degrees ) + degreeOffset;

			var col	= new NormalizedColor();

			// NormalizedColor.hsvToRgb( hue, 1.0, 1.0, col );
			NormalizedColor.hsvToRgb( hue, normal / 2, normal, col );

			var finalColor = new Color();

			col.getColor( finalColor );
			this.precalcColors[ i ]	= finalColor;
		}
	};


	return Mandelbrot;
} );

