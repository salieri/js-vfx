

define( [],

function()
{
	'use strict';

	/**
x	 * @param {int} width
	 * @param {int} height
	 * @param {Uint8ClampedArray} [data]
	 */
	var VirtualSurface = function( width, height, data )
	{
		this.data	= data || new Uint8ClampedArray( width * height * 4 );
		this.width	= width;
		this.height	= height;
	};


	VirtualSurface.prototype = {


		/**
		 * @returns {int}
		 */
		getWidth : function()
		{
			return this.width;
		},


		/**
		 * @returns {int}
		 */
		getHeight : function()
		{
			return this.height;
		},


		/**
		 * @returns {Uint8ClampedArray}
		 * @public
		 */
		getData : function()
		{
			return this.data;
		},


		/**
		 * @param {Point2D} pos
		 * @param {Color} destColor
		 * @public
		 */
		getPixel : function( pos, destColor )
		{
			var ptr = ( Math.round( pos.x ) + Math.round( pos.y ) * this.width ) * 4;

			destColor.set(
					this.data[ ptr ],
					this.data[ ptr + 1 ],
					this.data[ ptr + 2 ]
				);
		}

	};


	return VirtualSurface;

} );



