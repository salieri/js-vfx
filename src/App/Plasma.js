/*
 * Plasma demo
 *
 * Written by Aleksi Asikainen 2014.
 */

define( [ 'Core/App', 'Core/NormalizedColor', 'Core/Color' ],

function( App, NormalizedColor, Color )
{
	'use strict';

	/**
	 * @param {string} targetCanvasId
	 * @constructor
	 * @extends {app.js}
	 */
	var Plasma = function( targetCanvasId )
	{
		App.call( this, targetCanvasId );

		this.calculatePlasma();
		this.calculatePalette();

		this.offset = 0;
	};


	Plasma.prototype = new App();

	Plasma.COLOR_COUNT = 1000;


	Plasma.prototype.draw = function()
	{
		this.startDrawing();

		var data	= this.virtualSurface.getData();
		var width	= this.virtualSurface.getWidth();
		var height	= this.virtualSurface.getHeight();

		var ptrMax			= width * height * 4;
		var ptr				= 0;
		var precalcPtr		= 0;
		var precalcTable	= this.precalcTable;
		var precalcColors	= this.precalcColors;
		var offset			= this.offset % Plasma.COLOR_COUNT;
		var colorCount		= Plasma.COLOR_COUNT;

		while( ptr < ptrMax )
		{
			var precalcVal	= precalcTable[ precalcPtr++ ] + offset; // Math.round( precalcTable[ precalcPtr++ ] / Plasma.COLOR_COUNT * 255 );

			if( precalcVal >= colorCount )
			{
				precalcVal -= colorCount;
			}

			var precalcCol	= precalcColors[ precalcVal ];

			data[ ptr++ ] = precalcCol.r;
			data[ ptr++ ] = precalcCol.g;
			data[ ptr++ ] = precalcCol.b;
			ptr++;
		}


		this.offset++;

		this.endDrawing( true );
	};



	Plasma.prototype.calculatePalette = function()
	{
		this.precalcColors	= new Array( Plasma.COLOR_COUNT );
		var degrees			= 180;
		var degreeOffset	= 40;


		for( var i = 0; i < Plasma.COLOR_COUNT; i++ )
		{
			var normal	= Math.sin( i / Plasma.COLOR_COUNT * Math.PI );
			var hue		= ( normal * degrees ) + degreeOffset;

			var col	= new NormalizedColor();

			// NormalizedColor.hsvToRgb( hue, 1.0, 1.0, col );
			NormalizedColor.hsvToRgb( hue, normal, 1 - normal, col );

			var finalColor = new Color();

			col.getColor( finalColor );
			this.precalcColors[ i ]	= finalColor;
		}
	};


	Plasma.prototype.calculatePlasma = function()
	{
		var width	= this.virtualSurface.getWidth();
		var height	= this.virtualSurface.getHeight();

		var ptr = 0;
		var min	= false;
		var max	= false;

		this.precalcTable = new Array( width * height );


		for( var y = 0; y < height; y++ )
		{
			for( var x = 0; x < width; x++ )
			{
				var val = ( Plasma.COLOR_COUNT / 2 ) + ( Plasma.COLOR_COUNT / 2 - 1 ) *
						Math.sin( x / 100 * Math.cos( y / 1000 ) * Math.tan( ptr / 1000000 ) ) *
						Math.cos( y / 100 * Math.sin( x / 100 ) * Math.tan( ptr / 1000000 ) );

				this.precalcTable[ ptr++ ] = Math.round( val );

				if( ( min === false ) || ( val < min ) )
				{
					min = val;
				}

				if( ( max === false ) || ( val > max ) )
				{
					max = val;
				}
			}
		}

		console.log( 'Min: ' + min );
		console.log( 'Max: ' + max );
	};


	return Plasma;
} );

