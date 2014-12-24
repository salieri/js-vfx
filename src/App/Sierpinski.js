/*
 * Sierpinski triangle demo
 *
 * @link http://en.wikipedia.org/wiki/Sierpinski_triangle
 *
 * Written by Aleksi Asikainen 2014.
 */

define( [ 'Core/App', 'Core/NormalizedColor', 'Core/Color', 'Core/Point2D', 'Core/Draw' ],

function( App, NormalizedColor, Color, Point2D, Draw )
{
	'use strict';

	/**
	 * @param {string} targetCanvasId
	 * @constructor
	 * @extends {App}
	 */
	var Sierpinski = function( targetCanvasId )
	{
		App.call( this, targetCanvasId );

		this.zoom			= 1;
		this.maxIterations	= 15;

		this.calculatePalette();
	};


	Sierpinski.prototype = new App();

	Sierpinski.prototype.drawRecursive = function( sideLength, posCenter, calculatedTriangleHeight, depth )
	{
		if( sideLength < 0.2 )
		{
			return;
		}

		var sideLengthHalf	= sideLength / 2;
		var triangleHeight	= calculatedTriangleHeight || Math.sqrt( ( sideLength * sideLength ) - ( sideLengthHalf * sideLengthHalf ) );
		var triangleHalf	= triangleHeight / 2;

		if(
			( posCenter.x + sideLengthHalf < 0 ) ||
			( posCenter.x - sideLengthHalf > this.virtualSurface.getWidth() ) ||
			( posCenter.y + sideLengthHalf < 0 ) ||
			( posCenter.y - sideLengthHalf > this.virtualSurface.getWidth() )
				)
		{
			return;
		}



		depth = depth || 0;

		var posA			= new Point2D( posCenter.x - sideLengthHalf, posCenter.y + triangleHalf ),
			posB			= new Point2D( posCenter.x + sideLengthHalf, posCenter.y + triangleHalf ),
			posC			= new Point2D( posCenter.x, posCenter.y - triangleHalf ),
			color			= new Color( this.precalcColors[ depth ] );

			color.a			= Math.round( 0.5 * ( this.maxIterations - depth ) / this.maxIterations * 255 );

		Draw.blendPixel( posA, color );
		Draw.blendPixel( posB, color );
		Draw.blendPixel( posC, color );

		if( depth + 1 < this.maxIterations )
		{
			var triangleDoubleHalf	= triangleHalf / 2,
				sideDoubleHalf		= sideLengthHalf / 2;

			this.drawRecursive( sideLengthHalf, new Point2D( posCenter.x - sideDoubleHalf, posCenter.y + triangleDoubleHalf ), triangleHalf, depth + 1 );
			this.drawRecursive( sideLengthHalf, new Point2D( posCenter.x + sideDoubleHalf, posCenter.y + triangleDoubleHalf ), triangleHalf, depth + 1 );
			this.drawRecursive( sideLengthHalf, new Point2D( posCenter.x, posCenter.y - triangleDoubleHalf ), triangleHalf, depth + 1 );
		}
	};


	Sierpinski.prototype.draw = function()
	{
		this.startDrawing();

		Draw.setSurface( this.virtualSurface );
		Draw.clear();

/*		var data	= this.virtualSurface.getData();
		var width	= this.virtualSurface.getWidth();
		var height	= this.virtualSurface.getHeight();
		var ptr		= 0;

		var maxIterations	= this.maxIterations;
*/
		var sideLength		= Math.min( this.canvas.height, this.canvas.width ) * this.zoom,
			offset			= new Point2D( this.zoom * 10, this.zoom * 3 ),
			posCenter		= new Point2D( this.canvas.width / 2 + offset.x, this.canvas.height / 2 + offset.y );

		this.drawRecursive( sideLength, posCenter );

		this.endDrawing( true );
	};


	Sierpinski.prototype.calculatePalette = function()
	{
		this.precalcColors	= new Array( this.maxIterations );
		var degrees			= 45;
		var degreeOffset	= 0;


		for( var i = 0; i < this.maxIterations; i++ )
		{
			var normal	= Math.cos( i / this.maxIterations * Math.PI );
			var hue		= ( normal * degrees ) + degreeOffset;

			var col	= new NormalizedColor();

			// NormalizedColor.hsvToRgb( hue, 1.0, 1.0, col );
			NormalizedColor.hsvToRgb( hue, i, 1, col );

			var finalColor = new Color();

			col.getColor( finalColor );
			this.precalcColors[ i ]	= finalColor;
		}
	};


	return Sierpinski;
} );

