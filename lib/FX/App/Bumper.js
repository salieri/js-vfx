/*
 * Bump mapping demo
 * 
 * Written by Aleksi Asikainen 2013.
 * 
 * BSD 3-Clause License
 * http://directory.fsf.org/wiki/License:BSD_3Clause
 * 
 */


/**
 * @param {string} targetCanvasID
 * @param {CanvasTexture} texture
 * @param {CanvasTexture} heightMapTexture
 * @returns {Bumper}
 */

function Bumper( targetCanvasID, texture, heightMapTexture )
{
	this.targetCanvasID			= targetCanvasID;
	this.heightMapTexture		= heightMapTexture;
	this.texture				= texture;
	
	this.targetCanvas			= Helper.getElement( this.targetCanvasID );
	
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


Bumper.prototype = {
	
	/**
	 * @param {float} pointHeight Height at X, Y
	 * @param {float} pointHeightRight Height at X + 1, Y
	 * @param {float} pointHeightAbove Height at X, Y - 1
	 * @return {Vector3D} Bump map normal	 
	 */	 	 	

	calculateNormal : function( pointHeight, pointHeightRight, pointHeightAbove )
	{
		var phphaDifference = pointHeight - pointHeightAbove;
		var phphrDifference = pointHeight - pointHeightRight;
	
		var divisor = Math.sqrt(
							( phphaDifference * phphaDifference )
							+
							( phphrDifference * phphrDifference )
							+
							this.embossDepth
						);
	
		/**
		 * Note: Have taken out z / divisor here, because it softens the image
		 * image too much for my taste.
		 */
	
		return new Vector3D( phphaDifference / divisor, phphrDifference / divisor, this.embossDepth /* / divisor */ );
	},


	/**
	 * Calculates a normal for each pixel in the height map
	 */

	precalculateNormals : function()
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
			
				this.precalculatedNormals[ singlePtr ] = bumpNormal.normalize();
					
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
	},


	draw : function()
	{
		if( this.isLoaded() !== true )
		{
			return;
		}
		
		if( this.hasPrecalculated() !== true )
		{
			this.precalculateNormals();
		}		
		
		
		this.drawing	= true;
		
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
		
		this.targetCanvas.getContext( '2d' ).putImageData( texturePixels, 0, 0 );
		
		this.drawing = false;
	},
	
	
	/**
	 * @param {float} x
	 * @param {float} y
	 * @param {float} z
	 */
	
	setLightPos : function( x, y, z )
	{
		this.lightPosition.x = x;
		this.lightPosition.y = y;
		this.lightPosition.z = z;
	},
	
	
	/**
	 * @param {float} depth
	 */
	
	setEmbossDepth : function( depth )
	{
		this.embossDepth = depth;
		
		this.precalculateNormals();
	},
	
	
	/**
	 * @returns {Boolean}
	 */
	
	isDrawing : function()
	{
		return this.drawing;
	},



	/**
	 * @returns {Boolean}
	 */
	
	isLoaded : function()
	{
		if( ( this.heightMapTexture.loaded === true ) && ( this.texture.loaded === true ) )
		{
			return true;
		}
		
		return false;
	},


	/**
	 * @returns {Boolean}
	 */
	
	hasPrecalculated : function()
	{
		return this.precalculated;
	}

};

