
define( [ 'Core/Helper', 'Core/Color' ],

function( Helper /*, Color*/ )
{
	'use strict';

	/**
	 * @param {String} elementID
	 * @param {Boolean} createElement
	 * @constructor
	 */
	var Surface = function( elementID, createElement )
	{
		this.elementID	= elementID;

		if( createElement === true )
		{
			this.canvas		= Helper.createElement( 'canvas' );

			this.canvas.setAttribute( 'id', elementID );
		}
		else
		{
			this.canvas		= Helper.getElement( elementID );
		}

		this.context	= this.canvas.getContext( '2d' );

		this.imageData	= null;
		this.drawing	= false;
	};


	Surface.prototype = {

		/**
		 * @returns {int}
		 * @public
		 */
		getWidth : function()
		{
			return this.canvas.width;
		},


		/**
		 * @returns {int}
		 * @public
		 */
		getHeight : function()
		{
			return this.canvas.height;
		},


		/**
		 * @returns {Array}
		 * @public
		 */
		getData : function()
		{
			return this.imageData.data;
		},


		/**
		 * @param {int} width
		 * @param {int} height
		 * @public
		 */
		setSize : function( width, height )
		{
			this.canvas.width	= width;
			this.canvas.height	= height;
		},


		/**
		 * @public
		 */
		beginPaint : function()
		{
			this.imageData	= this.context.createImageData( this.getWidth(), this.getHeight() );
			this.drawing	= true;
		},


		/**
		 * @public
		 */
		endPaint : function()
		{
			this.context.putImageData( this.imageData, 0, 0, 0, 0, this.getWidth(), this.getHeight() );

			this.imageData	= null;
			this.drawing	= false;
		},


		/**
		 * @returns {Boolean}
		 * @public
		 */

		isDrawing : function()
		{
			return this.drawing;
		},


		/**
		 * @param {Color} bgColor
		 * @public
		 */
		clear : function( bgColor )
		{
			if( this.drawing !== true )
			{
				return;
			}

			var ptrMax	= this.canvas.width * this.canvas.height * 4;
			var data	= this.imageData.data;

			var r		= bgColor.r;
			var g		= bgColor.g;
			var b		= bgColor.b;
			var a		= bgColor.a;

			var ptr		= 0;

			while( ptr < ptrMax )
			{
				data[ ptr++ ]	= r;
				data[ ptr++ ]	= g;
				data[ ptr++ ]	= b;
				data[ ptr++ ]	= a;
			}
		}
	};


	return Surface;
} );
