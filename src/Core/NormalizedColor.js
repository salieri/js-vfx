

define( [ 'Core/Color' ],

function( Color )
{
	'use strict';

	/**
	 * @param {int|float|Number|NormalizedColor|Color} [r=0]
	 * @param {int|float|Number} [g=0]
	 * @param {int|float|Number} [b=0]
	 * @param {int|float|Number} [a=1]
	 * @constructor
	 */
	var NormalizedColor = function( r, g, b, a )
	{
		this.set( r, g, b, a );
	};


	/**
	 * @link http://www.cs.rit.edu/~ncs/color/t_convert.html
	 * @param {Number} hue 0..359
	 * @param {Number} saturation 0..1
	 * @param {Number} value 0..1
	 * @param {NormalizedColor} targetColor
	 * @static
	 * @public
	 */
	NormalizedColor.hsvToRgb = function( hue, saturation, value, targetColor )
	{
		if( saturation === 0 )
		{
			targetColor.set( value, value, value );
			return;
		}

		var sector = hue / 60.0;

		var flooredHue	= Math.floor( sector );
		var factorial	= sector - flooredHue;

		var p = value * ( 1 - saturation );
		var q = value * ( 1 - ( saturation * factorial ) );
		var t = value * ( 1 - ( saturation * ( 1 - factorial ) ) );

		switch( flooredHue )
		{
			case 0:
				targetColor.set( value, t, p );
				break;

			case 1:
				targetColor.set( q, value, p );
				break;

			case 2:
				targetColor.set( p, value, t );
				break;

			case 3:
				targetColor.set( p, q, value );
				break;

			case 4:
				targetColor.set( t, p, value );
				break;

			default:
				targetColor.set( value, p, q );
				break;
		}
	};


	NormalizedColor.prototype = {

		/**
		 * @param {float|Color|NormalizedColor} [r=0]
		 * @param {int|float|Number} [g=0]
		 * @param {int|float|Number} [b=0]
		 * @param {int|float|Number} [a=1]
		 */
		set : function( r, g, b, a )
		{
			if( r instanceof Color )
			{
				r.getNormalizedColor( this );
			}
			else if( r instanceof NormalizedColor )
			{
				this.r = r.r;
				this.g = r.g;
				this.b = r.b;
				this.a = r.a;
			}
			else
			{
				this.r = Math.max( Math.min( r, 1 ), 0 ) || 0;
				this.g = Math.max( Math.min( g, 1 ), 0 ) || 0;
				this.b = Math.max( Math.min( b, 1 ), 0 ) || 0;
				this.a = Math.max( Math.min( a, 1 ), 0 ) || 1;
			}
		},


		/**
		 * @param {Color} color
		 */
		getColor : function( color )
		{
			color.r = Math.round( this.r * 255 );
			color.g = Math.round( this.g * 255 );
			color.b = Math.round( this.b * 255 );
			color.a = Math.round( this.a * 255 );
		},


		/**
		 * @param {NormalizedColor} color
		 */
		add : function( color )
		{
			this.r = this.r + color.r;
			this.g = this.g + color.g;
			this.b = this.b + color.b;
		}

	};


	return NormalizedColor;
} );


