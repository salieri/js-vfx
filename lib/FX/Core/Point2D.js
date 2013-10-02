
/**
 * @param {float} x
 * @param {float} y
 */

function Point2D( x, y )
{
	this.x = x || 0;
	this.y = y || 0;
}


Point2D.prototype = {
	
	/**
	 * @param {Point2D} p
	 */
	
	swap : function( p )
	{
		var tx = p.x;
		var ty = p.y;
		
		p.x = this.x;
		p.y = this.y;
		
		this.x = tx;
		this.y = ty;
	},
	
	
	round : function()
	{
		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
	}
	
};
