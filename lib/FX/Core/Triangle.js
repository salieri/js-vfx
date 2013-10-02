
var Triangle = {

	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 */
	
	calculateBounds : function( p1, p2, p3 )
	{
		this.sortPoints( p1, p2, p3 );
		
		return {
				rSizeAdder	: ( p3.x - p1.x ) / ( p3.y - p1.y ),
				lSizeAdder	: ( p2.x - p1.x ) / ( p2.y - p1.y + 1 ),
				lSizeAdder2	: ( p3.x - p2.x ) / ( p3.y - p2.y )
			};
	},



	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 */
	
	draw : function( p1, p2, p3 )
	{
		var bounds	= this.calculateBounds( p1, p2, p3 );
		
		var rx = this.drawHalfTriangle( 
				p1, 
				p2, 
				p3, 
				bounds.lSizeAdder, 
				bounds.rSizeAdder, 
				p1.x + bounds.lSizeAdder / 2, 
				p1.x 
			);

		p2.y++;

		this.drawHalfTriangle( p2, p3, p1, bounds.lSizeAdder2, bounds.rSizeAdder, p2.x, rx );
	},


	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {float} lAdder
	 * @param {float} rAdder
	 * @param {float} rx
	 * @returns {Number}
	 */

	drawHalfTriangle : function( p1, p2, p3, lAdder, rAdder, lx, rx )
	{
		var surface		= Draw.getSurface();
		var data		= surface.getData();
		
		var colR		= Draw.color.r;
		var colG		= Draw.color.g;
		var colB		= Draw.color.b;		
		
		var width		= surface.getWidth();
		var height		= surface.getHeight();
		
		var ptr			= Math.round( Math.min( lx, rx ) + p1.y * width ) * 4;

		var minLeftX	= Math.min( p1.x, p2.x );
		var maxLeftX	= Math.max( p1.x, p2.x );

		var minRightX	= Math.min( p1.x, p3.x, p2.x );
		var maxRightX	= Math.max( p1.x, p3.x, p2.x );		
		
		
		for( var y = p1.y; ( y <= p2.y ) && ( y < height ); y++ )
		{
			var minX = Math.round( Math.min( lx, rx ) );
			var maxX = Math.round( Math.max( lx, rx ) );
			
			if( y >= 0 )
			{
				if( minX < 0 )
				{
					ptr		+= Math.abs( minX ) * 4;
					minX	= 0;					
					maxX	= Math.max( maxX, minX );
				}
				
				maxX = Math.min( maxX, width - 1 );
				
				for( var xp = minX; xp <= maxX; xp++ )
				{
					data[ ptr ]		= colR;
					data[ ptr + 1 ]	= colG;
					data[ ptr + 2 ]	= colB;

					ptr += 4;
				}
			}
			else
			{
				ptr += ( maxX - minX ) * 4 + 4;
			}
			
			lx += lAdder;
			rx += rAdder;
			
			lx = Math.max( lx, minLeftX );
			lx = Math.min( lx, maxLeftX );

			rx = Math.max( rx, minRightX );
			rx = Math.min( rx, maxRightX );			
			
			ptr += ( ( width - maxX ) + Math.round( Math.min( lx, rx ) ) ) * 4;
			ptr -= 4;
		}
		
		return rx;
	},


	
	/**
	 * Sort p1, p2, p3 in lowest Y order.
	 * 
	 * Relies on arguments being treated as byref
	 * 
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 */
	
	sortPoints : function( p1, p2, p3 )
	{
		p1.round();
		p2.round();
		p3.round();
		
		if( p3.y < p1.y )
		{
			p3.swap( p1 );
		}
		
		if( p2.y < p1.y )
		{
			p2.swap( p1 );
		}
		
		if( p3.y < p2.y )
		{
			p3.swap( p2 );
		}
	}
};

