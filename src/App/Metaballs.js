/*
 * Metaballs demo
 *
 * @link http://en.wikipedia.org/wiki/Metaballs
 * @link http://www.gamedev.net/page/resources/_/technical/graphics-programming-and-theory/exploring-metaballs-and-isosurfaces-in-2d-r2556
 * @link http://www.somethinghitme.com/2012/06/06/2d-metaballs-with-canvas/
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
	var Metaballs = function( targetCanvasId )
	{
		App.call( this, targetCanvasId );

		this.balls			= [];

		this.thresholdMin	= 0.001;
		this.thresholdMax	= 1000;

	};


	Metaballs.prototype = new App();


	Metaballs.prototype.draw = function() // jshint ignore:line
	{
		this.startDrawing();

		Draw.setSurface( this.virtualSurface );
		Draw.clear();

		var data	= this.virtualSurface.getData();
		var width	= this.virtualSurface.getWidth();
		var height	= this.virtualSurface.getHeight();
		var ptr		= 0;

		var balls			= this.balls;
		var ballCount		= balls.length;
		var thresholdMin	= this.thresholdMin;
		var thresholdMax	= this.thresholdMax;

		for( var y = 0; y < height; y++ )
		{
			for( var x = 0; x < width; x++ )
			{
				var power	= 0,
					colR	= 0,
					colG	= 0,
					colB	= 0;

				for( var i = 0; i < ballCount; i++ )
				{
					var b				= balls[ i ],
						xDiff			= x - b.pos.x,
						yDiff			= y - b.pos.y,
						tint			= b.tint;

					if( ( xDiff === 0 ) && ( yDiff === 0 ) )
					{
						power	+= b.power;
						colR	+= tint.r;
						colG	+= tint.g;
						colB	+= tint.b;
					}
					else
					{
						var d = b.radiusTimesPower / Math.sqrt( xDiff * xDiff + yDiff * yDiff );

						colR	+= tint.r * d;
						colG	+= tint.g * d;
						colB	+= tint.b * d;
						power	+= d;
					}
				}


				if( ( power >= thresholdMin ) && ( power <= thresholdMax ) )
				{
					if( power < 1.0 ) // this helps with the fall-off
					{
						var sine = Math.sin( 0.5 * Math.PI * power );

						var m = sine * sine * sine;

						colR *= m;
						colG *= m;
						colB *= m;
					}

					colR = Math.round( Math.min( 255, Math.max( 0, colR * 255 ) ) );
					colG = Math.round( Math.min( 255, Math.max( 0, colG * 255 ) ) );
					colB = Math.round( Math.min( 255, Math.max( 0, colB * 255 ) ) );

					data[ ptr++ ] = colR;
					data[ ptr++ ] = colG;
					data[ ptr++ ] = colB;
					ptr++;
				}
				else
				{
					ptr += 4;
				}
			}
		}

		this.endDrawing( true );
	};


	/**
	 * @public
	 * @param {object|Array} ball
	 */
	Metaballs.prototype.add = function( ball )
	{
		if( ball instanceof Array )
		{
			this.balls = this.balls.concat( ball );
		}
		else
		{
			this.balls.push( ball );
		}

		this.precalculate();
	};


	Metaballs.prototype.precalculate = function()
	{
		for( var i = 0; i < this.balls.length; i++ )
		{
			this.balls[ i ].radiusTimesPower = this.balls[ i ].radius * this.balls[ i ].power;
		}
	};


	return Metaballs;
} );

