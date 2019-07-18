/*
 * Fisheye lens distortion demo
 *
 * Written by Aleksi Asikainen 2014.
 *
 * Based on algorithm described in http://popscan.blogspot.co.uk/2012/04/fisheye-lens-equation-simple-fisheye.html
 *
 */


define( [ 'Core/App', 'Core/CanvasTexture', 'Core/EmptyTexture' ],

function( App, CanvasTexture, EmptyTexture )
{
	'use strict';

	/**
	 * @link http://popscan.blogspot.co.uk/2012/04/fisheye-lens-equation-simple-fisheye.html
	 * @param {string} targetCanvasId
	 * @param {string} bgImageUrl
	 * @constructor
	 * @extends {app.js}
	 */
	var FisheyeLens = function( targetCanvasId, bgImageUrl )
	{
		App.call( this, targetCanvasId );

		this.bgImage	= new CanvasTexture( bgImageUrl );
		this.textures	= [ new EmptyTexture( targetCanvasId ), new EmptyTexture( targetCanvasId ) ];
		this.lenses		= [];
	};


	FisheyeLens.prototype = new App();


	/**
	 * Add a new lens
	 *
	 * <code>
	 * var lens = {
	 * 		x		: 0,
	 * 		y		: 0,
	 *		radius	: 50
	 * };
	 * </code>
	 *
	 * @param {object} lens
	 * @public
	 */
	FisheyeLens.prototype.addLens = function( lens )
	{
		this.lenses.push( lens );
	};


	FisheyeLens.prototype.draw = function()
	{
		this.drawing			= true;
		this.textures[ 0 ].data	= this.bgImage.context.getImageData( 0, 0, this.textures[ 0 ].getWidth(), this.textures[ 0 ].getHeight() );

		var curSourceCanvas		= 0;
		var curDestCanvas		= 1;

		// this is very unoptimized
		for( var i = 0; i < this.lenses.length; i++ )
		{
			this.textures[ curDestCanvas ].data.data.set( new Uint8ClampedArray( this.textures[ curSourceCanvas ].data.data ) );

			this.drawLens(
					Math.round( this.lenses[ i ].x ),
					Math.round( this.lenses[ i ].y ),
					Math.round( this.lenses[ i ].radius ),
					this.textures[ curDestCanvas ], this.textures[ curSourceCanvas ]
				);

			curSourceCanvas	= 1 - curSourceCanvas;
			curDestCanvas	= 1 - curDestCanvas;
		}

		this.canvas.getContext( '2d' ).putImageData( this.textures[ curSourceCanvas ].data, 0, 0 );

		this.drawing = false;
	};


	/**
	 * @param {int} posX
	 * @param {int} posY
	 * @param {int} radius
	 * @param {CanvasTexture} destCanvasTexture
	 * @param {CanvasTexture} sourceCanvasTexture
	 * @private
	 */
	FisheyeLens.prototype.drawLens = function( posX, posY, radius, destCanvasTexture, sourceCanvasTexture )
	{
		var destData	= destCanvasTexture.data.data;
		var sourceData	= sourceCanvasTexture.data.data;
		var sourceWidth	= sourceCanvasTexture.getWidth();

		var halfRadius		= 0.5 * radius;

		for( var y = 0; y < radius; y++ )
		{
			var ptr			= ( posX + ( y + posY ) * destCanvasTexture.getWidth() ) * 4;
			var ny			= ( y / halfRadius ) - 1.0;
			var ny2			= ny * ny;

			for( var x = 0; x < radius; x++ )
			{
				var nx	= ( x / halfRadius ) - 1.0;
				var r	= Math.sqrt( nx * nx + ny2 );

				if( ( r >= 0.0 ) && ( r <= 1.0 ) )
				{
					var theta	= Math.atan2( ny, nx );
					var rd		= ( r + ( 1 - Math.sqrt( 1 - ( r * r ) ) ) ) / 2;

					if( rd <= 1.0 )
					{
						var fnx		= rd * Math.cos( theta );
						var fny		= rd * Math.sin( theta );
						var px		= posX + Math.round( ( fnx + 1.0 ) * halfRadius );
						var py		= posY + Math.round( ( fny + 1.0 ) * halfRadius );
						var bgPtr	= ( py * sourceWidth + px ) * 4;

						destData[ ptr++ ] = sourceData[ bgPtr++ ];
						destData[ ptr++ ] = sourceData[ bgPtr++ ];
						destData[ ptr++ ] = sourceData[ bgPtr++ ];

						ptr++;
					}
					else
					{
						ptr += 4;
					}
				}
				else
				{
					ptr += 4;
				}
			}
		}
	};


	return FisheyeLens;
} );

