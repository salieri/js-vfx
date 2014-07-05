/**
 * Crepuscular rays demo
 *
 * Written by Aleksi Asikainen 2014
 *
 * @link http://http.developer.nvidia.com/GPUGems3/gpugems3_ch13.html
 */

define( [ 'Core/App', 'Core/CanvasTexture', 'Core/Draw', 'Core/Texture', 'Core/Point2D', 'Core/Color', 'Core/VirtualSurface' ],

function( App, CanvasTexture, Draw, Texture, Point2D, Color, VirtualSurface )
{
	'use strict';

	var CrepuscularApp = function( canvasId, backgroundImageUrl, maskImageUrl )
	{
		App.call( this, canvasId );

		this.bgImage	= new CanvasTexture( backgroundImageUrl );
		this.maskImage	= new CanvasTexture( maskImageUrl );

		/*this.weight		= 0.2;
		this.samples	= 5;
		this.decay		= 0.3;
		this.density	= 0.4;
		this.exposure	= 1;*/

		this.maskImagePosition	= new Point2D( -120, -180 );
		this.drawMask			= true;
		this.drawBackground		= true;
		this.dirtySurface		= false;

		this.drawArea			= new VirtualSurface( this.canvas.width, this.canvas.height );

		this.totalDrawTime		= 0;
		this.totalDrawCount		= 0;

		this.lights		= [];
	};


	CrepuscularApp.prototype = new App();


	CrepuscularApp.prototype.draw = function()
	{
		var i;
		var drawStart = Date.now();

		var drawDest	= this.drawArea;

		if( this.dirtySurface === true )
		{
			drawDest	= this.virtualSurface;
		}

		this.startDrawing();

		if( this.drawBackground === true )
		{
			this.bgImage.draw( drawDest, 0, 0 );
		}

		for( i = 0; i < this.lights.length; i++ )
		{
			if( ( this.lights[ i ].active === true ) && ( this.lights[ i ].drawLight === true ) )
			{
				this.lights[ i ].image.draw(
						drawDest,
						this.lights[ i ].position.x - this.lights[ i ].image.getWidth() / 2,
						this.lights[ i ].position.y - this.lights[ i ].image.getHeight() / 2
					);
			}
		}


		if( this.drawMask === true )
		{
			this.maskImage.draw( drawDest, this.maskImagePosition.x, this.maskImagePosition.y );
		}


		for( i = 0; i < this.lights.length; i++ )
		{
			if( this.lights[ i ].active === true )
			{
			 	this.processRays( this.lights[ i ], this.virtualSurface.data, drawDest.data );
			}
		}


		for( i = 3; i < this.virtualSurface.data.length; i += 4 )
		{
			this.virtualSurface.data[ i ] = 255;
			// this.drawArea.data[ i ] = 255;
		}

		this.endDrawing( true );


		/* var drawTime = ( Date.now() - drawStart ) / 1000;

		this.totalDrawTime += drawTime;
		this.totalDrawCount++;

		console.log(
				'Draw took ' + drawTime + ' s',
				'Average ' + ( this.totalDrawTime / this.totalDrawCount ) + ' s'
			);*/
	};


	/**
	 * <code>
	 * var lightObject = {
	 * 		active			: true,
	 * 		position		: new Point2D( 0, 0 ),
	 * 		weight			: 0.2,
	 * 		decay			: 0.3,
	 * 		exposure		: 1,
	 *		density			: 0.4,
	 *		samples			: 10,
	 *		imageUrl		: 'resources/light.png'
	 * };
	 * </code>
	 *
	 * @public
	 * @param {object|Array} lightObject
	 */
	CrepuscularApp.prototype.addLight = function( lightObject )
	{
		if( lightObject instanceof Array )
		{
			for( var i = 0; i < lightObject.length; i++ )
			{
				lightObject[ i ].image = new CanvasTexture( lightObject[ i ].imageUrl );
				this.lights.push( lightObject[ i ] );
			}
		}
		else
		{
			lightObject.image = new CanvasTexture( lightObject.imageUrl );
			this.lights.push( lightObject );
		}
	};


	CrepuscularApp.prototype.processRays = function( light, dest, source ) // jshint ignore:line
	{
		var dataPtr = 0;
		// var data	= this.virtualSurface.data;
		var	width	= this.virtualSurface.getWidth();
		var height	= this.virtualSurface.getHeight();

		var samples		= light.samples;
		var weight		= light.weight;
		var decay		= light.decay;
		var exposure	= light.exposure;

		var lightPosX	= light.position.x,
			lightPosY	= light.position.y;

		var normalSamplesByDensity = 1.0 / samples * light.density;

		var maxPtr		= width * height * 4;

		var curPosX, curPosY, deltaTexX, deltaTexY,
				initialR, initialG, initialB,
				curR, curG, curB, curPtr, curMul;


			// deltaTex		= new Point2D(),
			// curPos			= new Point2D(),
			// initialColor	= new Color(),
			// curColor		= new Color();


		for( var y = 0; y < height; y++ )
		{
			for( var x = 0; x < width; x++ )
			{
				// curPos.set( x, y );
				// deltaTex.set( curPos );
				// this is faster:
				curPosX		= x;
				curPosY		= y;
				deltaTexX	= x;
				deltaTexY	= y;

				//deltaTex.subtract( light.position );
				// deltaTex.multiplyByVal( normalSamplesByDensity );
				// this is faster:
				deltaTexX -= lightPosX;
				deltaTexY -= lightPosY;
				deltaTexX *= normalSamplesByDensity;
				deltaTexY *= normalSamplesByDensity;


				// this.virtualSurface.getPixel( curPos, initialColor );
				// this is faster:
				initialR = source[ dataPtr ];
				initialG = source[ dataPtr + 1 ];
				initialB = source[ dataPtr + 2 ];

				var illuminationDecay = 1.0;

				for( var i = 0; i < samples; i++ )
				{
					// curPos.subtract( deltaTex );
					// this is faster:
					curPosX -= deltaTexX;
					curPosY -= deltaTexY;

					// this.virtualSurface.getPixel( curPos, curColor );
					// this is faster:
					curPtr	= ( Math.round( curPosX ) + Math.round( curPosY ) * width ) * 4;

					if( ( curPtr >= 0 ) && ( curPtr < maxPtr ) )
					{
						curR	= source[ curPtr++ ];
						curG	= source[ curPtr++ ];
						curB	= source[ curPtr ];

						// curColor.multiplyByVal( illuminationDecay * weight, true );
						// initialColor.add( curColor, true );
						// this is faster:
						curMul		= illuminationDecay * weight;
						curR		*= curMul;
						curG		*= curMul;
						curB		*= curMul;
						initialR	+= curR;
						initialG	+= curG;
						initialB	+= curB;

						illuminationDecay *= decay;
					}
				}

				// initialColor.multiplyByVal( exposure );
				// this is faster:
				initialR = Math.max( 0, Math.min( 255, Math.round( initialR * exposure ) ) );
				initialG = Math.max( 0, Math.min( 255, Math.round( initialG * exposure ) ) );
				initialB = Math.max( 0, Math.min( 255, Math.round( initialB * exposure ) ) );


				// data[ dataPtr++ ]	= initialColor.r;
				// data[ dataPtr++ ]	= initialColor.g;
				// data[ dataPtr++ ]	= initialColor.b;
				// this is faster:
				dest[ dataPtr++ ]	= initialR;
				dest[ dataPtr++ ]	= initialG;
				dest[ dataPtr++ ]	= initialB;

				dataPtr++;
			}
		}
	};


	return CrepuscularApp;
} );

