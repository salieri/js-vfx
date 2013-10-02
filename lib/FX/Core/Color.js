

function Color( r, g, b, a )
{
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.a = a || 255;
}


Color.prototype = {
	
	/**
	 * @param {int} r
	 * @param {int} g
	 * @param {int} b
	 * @returns {undefined}
	 */
	
	set : function( r, g, b )
	{
		this.r = r;
		this.g = g;
		this.b = b;
	}
	
};
	
	


