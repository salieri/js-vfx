
define( [
			'Core/Surface', 'Core/Color', 'Core/Point2D', 'Core/Point3D', 'Core/CanvasTexture', 'Core/Line',
			'Core/BetterTriangle', 'Core/BetterInterpolatedTriangle', 'Core/TexturedTriangle'
	],

function( Surface, Color, Point2D, Point3D, CanvasTexture, Line, BetterTriangle, BetterInterpolatedTriangle, TexturedTriangle ) // jshint ignore:line
{
	'use strict';

	/**
	 * @namespace
	 */
	var Draw = {

		/**
		 * @type {Surface}
		 */
		surface		: null,

		/**
		 * @type {Color}
		 */
		color		: new Color( 255, 0, 0 ),

		/**
		 * @type {Color}
		 */
		bgColor		: new Color( 64, 64, 64 ),



		/**
		 * @param {Surface} surface
		 * @public
		 */
		setSurface : function( surface )
		{
			Draw.surface = surface;
		},


		/**
		 * @returns {Surface}
		 * @public
		 */
		getSurface : function()
		{
			return Draw.surface;
		},


		/**
		 * @public
		 */
		beginPaint : function()
		{
			Draw.surface.beginPaint();
			Draw.clear();
		},


		/**
		 * @public
		 */
		endPaint : function()
		{
			Draw.surface.endPaint();
		},


		/**
		 * @returns {Boolean}
		 * @public
		 */

		isDrawing : function()
		{
			return Draw.surface.isDrawing();
		},


		/**
		 * @public
		 */
		clear : function()
		{
			Draw.surface.clear( Draw.bgColor );
		},


		/**
		 * @param {Point2d} point
		 * @param {Color} color
		 * @public
		 */
		setPixel : function( point, color )
		{
			var x = Math.round( point.x );
			var y = Math.round( point.y );

			if( ( x < 0 ) || ( y < 0 ) || ( x >= Draw.surface.getWidth() ) || ( y >= Draw.surface.getHeight() ) )
			{
				return;
			}

			var data	= Draw.surface.getData();
			var ptr		= ( x + ( y * Draw.surface.getWidth() ) ) * 4;

			data[ ptr++ ]	= color.r;
			data[ ptr++ ]	= color.g;
			data[ ptr ]		= color.b;
		},


		/**
		 * @param {Point2d} point
		 * @param {Color} color
		 * @public
		 */
		blendPixel : function( point, color )
		{
			var x = Math.round( point.x );
			var y = Math.round( point.y );

			if( ( x < 0 ) || ( y < 0 ) || ( x >= Draw.surface.getWidth() ) || ( y >= Draw.surface.getHeight() ) )
			{
				return;
			}

			var data	= Draw.surface.getData();
			var ptr		= ( x + ( y * Draw.surface.getWidth() ) ) * 4;
			var ptrpp	= ptr + 1;
			var ptrp2	= ptr + 2;
			var colMul	= color.a / 255;

			var rd = ( color.r - data[ ptr ] ) * colMul;
			var gd = ( color.g - data[ ptrpp ] ) * colMul;
			var bd = ( color.b - data[ ptrp2 ] ) * colMul;

			data[ ptr ]			+= rd;
			data[ ptrpp ]		+= gd;
			data[ ptrp2 ]		+= bd;
		},


		blendValue : function( bgValue, fgValue, opacity )
		{
			if( opacity === 255 )
			{
				return fgValue;
			}

			if( opacity === 0 )
			{
				return bgValue;
			}

			return Math.min( 255, Math.max( 0, bgValue + Math.round( ( fgValue - bgValue ) * ( opacity / 255 ) ) ) );
		},


		/**
		 * @param {Point2d} p1
		 * @param {Point2d} p2
		 * @param {Color} color
		 * @public
		 */
		line : function( p1, p2, color )
		{
			Line.draw( p1, p2, color, Draw.surface );
		},


		/**
		 * @param {Point2d} p1
		 * @param {Point2d} p2
		 * @param {Point2d} p3
		 * @param {Color} color
		 * @public
		 */
		triangle : function( p1, p2, p3, color )
		{
			BetterTriangle.draw( p1, p2, p3, color, Draw.surface );
			// BetterTexturedTriangle.draw( p1, p2, p3, color );
		},


		/**
		 * @param {Point2d} p1
		 * @param {Point2d} p2
		 * @param {Point2d} p3
		 * @param {Color} c1
		 * @param {Color} c2
		 * @param {Color} c3
		 * @public
		 */
		interpolatedTriangle : function( p1, p2, p3, c1, c2, c3 )
		{
			BetterInterpolatedTriangle.draw( p1, p2, p3, c1, c2, c3, Draw.surface );
		},


		/**
		 * @param {Point2d} p1
		 * @param {Point2d} p2
		 * @param {Point2d} p3
		 * @param {Point3d} uv1
		 * @param {Point3d} uv2
		 * @param {Point3d} uv3
		 * @param {CanvasTexture} texture
		 * @public
		 */
		texturedTriangle : function( p1, p2, p3, uv1, uv2, uv3, texture )
		{
			TexturedTriangle.draw( p1, p2, p3, uv1, uv2, uv3, texture, Draw.surface );
		}
	};


	return Draw;
} );
