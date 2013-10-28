/**
 * @param a
 * @param b
 * @constructor
 */

function Edge( a, b )
{
	this.a = a;
	this.b = b;
}


Edge.prototype = {
	
	/**
	 * @param {int} a
	 * @param {int} b
	 */
	
	set : function( a, b )
	{
		this.a = a;
		this.b = b;
	}
};

