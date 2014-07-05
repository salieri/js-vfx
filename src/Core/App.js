
define( [ 'Core/Helper', 'Core/VirtualSurface' ],

function( Helper, VirtualSurface )
{
	'use strict';

	var App = function( canvasElementId )
	{
		this.drawing		= false;
		this.paused			= false;
		this.startTime		= new Date();

		if( canvasElementId )
		{
			this.canvasId		= canvasElementId;
			this.canvas			= Helper.getElement( this.canvasId );
			this.canvasContext	= this.canvas.getContext( '2d' );
			this.canvasPixels	= this.canvas.getContext( '2d' ).createImageData( this.canvas.width, this.canvas.height );

			this.virtualSurface	= new VirtualSurface( this.canvas.width, this.canvas.height, this.canvasPixels.data );
		}
		else
		{
			this.canvas			= null;
			this.canvasId		= '';
			this.canvasContext	= null;
			this.canvasPixels	= null;
			this.virtualSurface	= null;
		}
	};


	App.prototype = {

		/**
		 * @public
		 */
		startDrawing : function()
		{
			this.drawing = true;
		},


		/**
		 * @public
		 */
		endDrawing : function( pushToCanvas )
		{
			if( pushToCanvas === true )
			{
				this.canvas.getContext( '2d' ).putImageData( this.canvasPixels, 0, 0 );
			}

			this.drawing = false;
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
		 * @public
		 */
		draw : function()
		{

		},


		/**
		 * @returns {boolean}
		 * @public
		 */
		isPaused : function()
		{
			return this.paused;
		},


		/**
		 * @public
		 * @param {boolean} isPaused
		 */
		setPaused : function( isPaused )
		{
			this.paused = isPaused;
		}

	};


	return App;

} );

