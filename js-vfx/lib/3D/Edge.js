define( [],

function()
{
	'use strict';

	/**
	 * @param a
	 * @param b
	 * @constructor
	 */
	var Edge = function( a, b )
	{
		this.a = a;
		this.b = b;
	};


	Edge.prototype = {

		/**
		 * @param {int} a
		 * @param {int} b
		 * @public
		 */
		set : function( a, b )
		{
			this.a = a;
			this.b = b;
		}
	};

	return Edge;
} );
