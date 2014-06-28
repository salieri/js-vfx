
define( [],

function()
{
	'use strict';

	/**
	 * @constructor
	 */
	var Renderer = function()
	{

	};


	Renderer.prototype = {

		/**
		 * Rasterize scene
		 *
		 * @param {Scene} scene
		 * @abstract
		 */
		draw : function( scene ) // jshint ignore:line
		{
			// do nothing
		}

	};

	return Renderer;

} );
