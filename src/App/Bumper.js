/*
 * Bump mapping demo
 *
 * Written by Aleksi Asikainen 2013.
 *
 */

define( [ 'Core/App', 'Core/Vector3D', 'Core/CanvasTexture' ],

function( App, Vector3D /*, CanvasTexture */ )
{
	'use strict';

	/**
	 * @param {string} targetCanvasId
	 * @param {CanvasTexture} texture
	 * @param {CanvasTexture} heightMapTexture
	 * @constructor
	 * @extends {app.js}
	 */
	function Bumper( targetCanvasId, texture, heightMapTexture )
	{
		App.call( this, targetCanvasId );

		this.heightMapTexture		= heightMapTexture;
		this.texture				= texture;

		this.lightPosition			= new Vector3D();
		this.drawing				= false;
		this.precalculated			= false;
		this.precalculatedNormals	= [];
		this.embossDepth			= 3;

		// Precalculate normals once height map has been loaded:
		var me = this;

		this.heightMapTexture.onload = function()
			{
				me.precalculateNormals();
			};
	}



	Bumper.prototype = new App();



	/**
	 * @param {float} pointHeight Height at X, Y
	 * @param {float} pointHeightRight Height at X + 1, Y
	 * @param {float} pointHeightAbove Height at X, Y - 1
	 * @return {Vector3D} Bump map normal
	 * @private
	 */
	Bumper.prototype.calculateNormal = function( pointHeight, pointHeightRight, pointHeightAbove )
	{
		var phphaDifference = pointHeight - pointHeightAbove;
		var phphrDifference = pointHeight - pointHeightRight;

		var divisor = Math.sqrt(
							( phphaDifference * phphaDifference )
							+ // jshint ignore:line
							( phphrDifference * phphrDifference )
							+ // jshint ignore:line
							this.embossDepth
						);

		/**
		 * Note: Have taken out z / divisor here, because it softens the image
		 * image too much for my taste.
		 */

		return new Vector3D( phphaDifference / divisor, phphrDifference / divisor, this.embossDepth /* / divisor */ );
	};


	/**
	 * Calculates a normal for each pixel in the height map
	 * @private
	 */
	Bumper.prototype.precalculateNormals = function()
	{
		var width		= this.heightMapTexture.getWidth();
		var height		= this.heightMapTexture.getHeight();
		var abovePtr	= 0;
		var ptr			= width * 4; // ignore first line
		var singlePtr	= width;
		var widthMinus	= width - 1;
		var pixels		= this.heightMapTexture.getPixels();
		var data		= pixels.data;

		this.precalculatedNormals = new Array( width * height );

		for( var y = 1; y < height; y++ )
		{
			for( var x = 0; x < widthMinus; x++ )
			{
				var bumpNormal = this.calculateNormal(
						data[ ptr ],
						data[ ptr + 4 ],
						data[ abovePtr ]
					);

				bumpNormal.normalize();

				this.precalculatedNormals[ singlePtr ] = bumpNormal;

				abovePtr	+= 4;
				ptr			+= 4;

				singlePtr++;
			}

			// Take in account width - 1
			abovePtr	+= 4;
			ptr			+= 4;

			singlePtr++;
		}

		this.precalculated = true;
	};


	Bumper.prototype.draw = function()
	{
		if( this.isLoaded() !== true )
		{
			return;
		}

		if( this.hasPrecalculated() !== true )
		{
			this.precalculateNormals();
		}

		this.startDrawing();

		var width		= this.heightMapTexture.getWidth();
		var height		= this.heightMapTexture.getHeight();
		var ptr			= width * 4; // ignore top line
		var singlePtr	= width;
		var widthMinus	= width - 1;

		var texturePixels	= this.texture.getPixels();
		var textureData		= texturePixels.data;

		var precalc			= this.precalculatedNormals;
		var realLightPos	= new Vector3D();
		var lightPos		= this.lightPosition;
		var lightPosZDiv2	= lightPos.z / 2;


		for( var y = 1; y < height; y++ )
		{
			for( var x = 0; x < widthMinus; x++ )
			{
				realLightPos.set( -( lightPos.y - y ), ( lightPos.x - x ) , lightPosZDiv2 );

				var bumpDot		= realLightPos.dot( precalc[ singlePtr ] );
				var distMul		= bumpDot / lightPos.distance( x, y, 0 );

				var ptrpp		= ptr + 1;
				var ptrp2		= ptr + 2;

				textureData[ ptr ]		= textureData[ ptr ] * distMul;
				textureData[ ptrpp ]	= textureData[ ptrpp ] * distMul;
				textureData[ ptrp2 ]	= textureData[ ptrp2 ] * distMul;

				ptr += 4;
				singlePtr++;
			}

			// take in account width - 1
			ptr += 4;
			singlePtr++;
		}

		this.canvas.getContext( '2d' ).putImageData( texturePixels, 0, 0 );

		this.endDrawing();
	};


	/**
	 * @param {float|int} x
	 * @param {float|int} y
	 * @param {float|int} z
	 * @public
	 */
	Bumper.prototype.setLightPos = function( x, y, z )
	{
		this.lightPosition.x = x;
		this.lightPosition.y = y;
		this.lightPosition.z = z;
	};


	/**
	 * @param {float|int} depth
	 * @public
	 */
	Bumper.prototype.setEmbossDepth = function( depth )
	{
		this.embossDepth = depth;

		this.precalculateNormals();
	};


	/**
	 * @returns {Boolean}
	 * @public
	 */
	Bumper.prototype.isLoaded = function()
	{
		return ( ( this.heightMapTexture.loaded === true ) && ( this.texture.loaded === true ) );
	};


	/**
	 * @returns {Boolean}
	 * @private
	 */
	Bumper.prototype.hasPrecalculated = function()
	{
		return this.precalculated;
	};


	return Bumper;
} );

