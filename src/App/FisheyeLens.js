/*
 * Fisheye lens distortion demo
 *
 * Written by Aleksi Asikainen 2014.
 *
 * Based on algorithm described in http://popscan.blogspot.co.uk/2012/04/fisheye-lens-equation-simple-fisheye.html
 *
 */


/**
 * @link http://popscan.blogspot.co.uk/2012/04/fisheye-lens-equation-simple-fisheye.html
 * @param {string} targetCanvasId
 * @param {string} bgImageUrl
 * @constructor
 */
function FisheyeLens( targetCanvasId, bgImageUrl )
{
	this.targetCanvasId			= targetCanvasId;
	this.targetCanvas			= Helper.getElement( this.targetCanvasId );

	this.bgImage				= new CanvasTexture( bgImageUrl );
	this.canvases				= [ new EmptyTexture( targetCanvasId ), new EmptyTexture( targetCanvasId ) ];

	this.lenses					= [];

	this.drawing				= false;

	this.textureContext			= this.targetCanvas.getContext( '2d' );
	this.texturePixels			= this.targetCanvas.getContext( '2d' ).createImageData( this.targetCanvas.width, this.targetCanvas.height );
}


FisheyeLens.prototype = {

	addLens : function( lens )
	{
		this.lenses.push( lens );
	},


	draw : function()
	{
		this.drawing			= true;

		this.canvases[ 0 ].data	= this.bgImage.context.getImageData( 0, 0, this.canvases[ 0 ].getWidth(), this.canvases[ 0 ].getHeight() );

		var curSourceCanvas	= 0;
		var curDestCanvas	= 1;

		// this is very unoptimized
		for( var i = 0; i < this.lenses.length; i++ )
		{
			this.canvases[ curDestCanvas ].data.data.set( new Uint8ClampedArray( this.canvases[ curSourceCanvas ].data.data ) );
		 	this.drawLens( Math.round( this.lenses[ i ].x ), Math.round( this.lenses[ i ].y ), Math.round( this.lenses[ i ].radius ), this.canvases[ curDestCanvas ], this.canvases[ curSourceCanvas ] );

			curSourceCanvas	= 1 - curSourceCanvas;
			curDestCanvas	= 1 - curDestCanvas;
		}

		this.targetCanvas.getContext( '2d' ).putImageData( this.canvases[ curSourceCanvas ].data, 0, 0 );

		this.drawing = false;
	},



	drawLens : function( posX, posY, radius, destCanvasTexture, sourceCanvasTexture )
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
	},


	/**
	 * @returns {Boolean}
	 */

	isDrawing : function()
	{
		return this.drawing;
	}

};

