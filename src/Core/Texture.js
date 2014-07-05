

define( [ 'Core/Draw' ],

function( Draw )
{
	'use strict';
	
	var Texture = function()
	{
		this.loaded			= false;
		this.canvas			= null;
		this.context		= null;
		this.data			= null;
		this.virtualSurface	= null;
	};


	Texture.prototype = {

		/**
		 * @return {int}
		 * @abstract
		 * @public
		 */
		getWidth : function()
		{
			return 0;
		},


		/**
		 * @return {int}
		 * @abstract
		 * @public
		 */
		getHeight : function()
		{
			return 0;
		},


		/**
		 * @return {CanvasPixelArray}
		 * @abstract
		 * @public
		 **/
		getPixels : function()
		{
			return null;
		},


		/**
		 * @param {CanvasPixelArray} pixels
		 * @public
		 */
		 setPixels : function( pixels )
		 {
			this.context.putImageData( pixels, 0, 0 );
		 },


		/**
		 * @public
		 * @returns {VirtualSurface}
		 */
		getVirtualSurface : function()
		{
			return this.virtualSurface;
		},


		/**
		 * @public
		 * @abstract
		 */
		create : function()
		{
		},


		/**
		 * @public
		 * @abstract
		 */
		destroy : function()
		{
		},


		/**
		 * @param {VirtualSurface} destVirtualSurface
		 * @param {int} posX
		 * @param {int} posY
		 * @param {int} [offsetX=0]
		 * @param {int} [offsetY=0]
		 * @param {int} [offsetWidth=sourceTexture.getWidth()]
		 * @param {int} [offsetHeight=sourceTexture.getHeight()]
		 * @public
		 */
		draw : function( destVirtualSurface, posX, posY, offsetX, offsetY, offsetWidth, offsetHeight )
		{
			Texture.draw( destVirtualSurface, this, posX, posY, offsetX, offsetY, offsetWidth, offsetHeight );
		}
	};


	/**
	 * @param {VirtualSurface} destVirtualSurface
	 * @param {Texture} sourceTexture
	 * @param {int} posX
	 * @param {int} posY
	 * @param {int} [offsetX=0]
	 * @param {int} [offsetY=0]
	 * @param {int} [offsetWidth=sourceTexture.getWidth()]
	 * @param {int} [offsetHeight=sourceTexture.getHeight()]
	 * @public
	 */
	Texture.draw = function( destVirtualSurface, sourceTexture, posX, posY, offsetX, offsetY, offsetWidth, offsetHeight ) // jshint ignore:line
	{
		if( ( !sourceTexture ) || ( !destVirtualSurface ) )
		{
			return;
		}

		var destData		= destVirtualSurface.getData();
		var destWidth		= destVirtualSurface.getWidth();
		var destHeight		= destVirtualSurface.getHeight();

		var textureWidth	= sourceTexture.getWidth();
		var textureHeight	= sourceTexture.getHeight();

		if( ( posX >= textureWidth ) || ( posY >= textureHeight ) || ( posX + textureWidth <= 0 ) || ( posY + textureHeight <= 0 ) )
		{
			return;
		}

		offsetX				= Math.round( Math.min( textureWidth - 1, Math.max( 0, offsetX || 0 ) ) );
		offsetY				= Math.round( Math.min( textureHeight - 1, Math.max( 0, offsetY || 0 ) ) );

		offsetWidth			= Math.round( Math.min( textureWidth, Math.max( 0, offsetWidth || textureWidth ) ) );
		offsetHeight		= Math.round( Math.min( textureHeight, Math.max( 0, offsetHeight || textureHeight ) ) );

		posX				= Math.round( posX );
		posY				= Math.round( posY );


		if( posX < 0 )
		{
			offsetX		+= -posX;
			offsetWidth	+= posX;
			posX		= 0;
		}

		if( posY < 0 )
		{
			offsetY			+= -posY;
			offsetHeight	+= posY;
			posY			= 0;
		}

		if( posX + offsetWidth > destWidth )
		{
			offsetWidth = destWidth - posX;
		}

		if( posY + offsetHeight > destHeight )
		{
			offsetHeight = destHeight - posY;
		}

		if( ( offsetWidth <= 0 ) || ( offsetHeight <= 0 ) )
		{
			return;
		}


		var destPtr				= ( posX + ( posY * destWidth ) ) * 4;
		var sourcePtr			= ( offsetX + ( offsetY * textureWidth ) ) * 4;

		var sourceOffsetAdder	= ( textureWidth - offsetWidth ) * 4;
		var destOffsetAdder		= ( destWidth - offsetWidth ) * 4;

		var sourceData			= sourceTexture.getPixels().data;


		for( var y = 0; y < offsetHeight; y++ )
		{
			for( var x = 0; x < offsetWidth; x++ )
			{
				var fgAlpha = sourceData[ sourcePtr + 3 ];

				if( fgAlpha === 0 )
				{
					sourcePtr	+= 3;
					destPtr		+= 3;
				}
				else if( fgAlpha === 255 )
				{
					destData[ destPtr++ ] = sourceData[ sourcePtr++ ];
					destData[ destPtr++ ] = sourceData[ sourcePtr++ ];
					destData[ destPtr++ ] = sourceData[ sourcePtr++ ];
				}
				else
				{
					destData[ destPtr ] = Draw.blendValue( destData[ destPtr ], sourceData[ sourcePtr++ ], fgAlpha );
					destPtr++;

					destData[ destPtr ] = Draw.blendValue( destData[ destPtr ], sourceData[ sourcePtr++ ], fgAlpha );
					destPtr++;

					destData[ destPtr ] = Draw.blendValue( destData[ destPtr ], sourceData[ sourcePtr++ ], fgAlpha );
					destPtr++;
				}

				destPtr++;
				sourcePtr++;
			}

			sourcePtr	+= sourceOffsetAdder;
			destPtr		+= destOffsetAdder;
		}
	};


	return Texture;
} );
