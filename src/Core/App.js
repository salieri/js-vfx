
define( [ 'Core/Helper' ],

function( Helper )
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
		}
		else
		{
			this.canvas			= null;
			this.canvasId		= '';
			this.canvasContext	= null;
			this.canvasPixels	= null;
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
		endDrawing : function()
		{
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

