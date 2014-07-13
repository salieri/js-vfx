/*
 * Wave effect demo
 *
 * Written by Aleksi Asikainen 2014.
 *
 */


define( [ 'Core/App', 'Core/CanvasTexture' ],

function( App, CanvasTexture )
{
	'use strict';

	/**
	 * @param {string} targetCanvasId
	 * @param {string} bgImageUrl
	 * @constructor
	 * @extends {App}
	 */
	var Wave = function( targetCanvasId, bgImageUrl )
	{
		App.call( this, targetCanvasId );

		this.bgImage	= new CanvasTexture( bgImageUrl );

		this.phase		= 0;
		this.amplitude	= 28.21;
		this.frequency	= 35.62;
	};


	Wave.prototype = new App();


	Wave.prototype.draw = function()
	{
		this.startDrawing();

		var x, y;

		var dest		= this.virtualSurface.data,
			destWidth	= this.virtualSurface.width,
			destHeight	= this.virtualSurface.height,
			destPtr		= 0;

		var source			= this.bgImage.virtualSurface.data,
			sourceWidth		= this.bgImage.virtualSurface.width,
			sourceHeight	= this.bgImage.virtualSurface.height;

		var period			= 0,
			periodIncrement	= Math.PI / this.frequency,
			phase			= this.phase,
			amplitude		= this.amplitude,
			displacementY	= new Array( destHeight ),
			displacementX	= new Array( destWidth );


		var periodY			= period,
			periodX			= period;

		for( y = 0; y < destHeight; y++ )
		{
			displacementY[ y ] = Math.round( amplitude * Math.sin( phase + periodY ) );
			periodY += periodIncrement;
		}

		for( x = 0; x < destWidth; x++ )
		{
			displacementX[ x ] = Math.round( amplitude * Math.cos( phase + periodX ) );
			periodX += periodIncrement;
		}



		for( y = 0; y < destHeight; y++ )
		{
			var dx = displacementY[ y ];

			for( x = 0; x < destWidth; x++ )
			{
				var dy = displacementX[ x ];

				var xp = x + dx;
				var yp = y + dy;

				if( ( xp >= 0 ) && ( xp < sourceWidth ) && ( yp >= 0 ) && ( yp < sourceHeight ) )
				{
					var sourcePtr = ( yp * sourceWidth + xp ) * 4;

					dest[ destPtr++ ] = source[ sourcePtr++ ];
					dest[ destPtr++ ] = source[ sourcePtr++ ];
					dest[ destPtr++ ] = source[ sourcePtr++ ];

					destPtr++;
				}
				else
				{
					dest[ destPtr++ ] = 0;
					dest[ destPtr++ ] = 0;
					dest[ destPtr++ ] = 0;
					destPtr++;
				}
			}

			period += periodIncrement;
		}

		this.endDrawing( true );
	};



	return Wave;
} );

