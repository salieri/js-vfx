/**
 * @class
 */

var Triangle = {

	p1	: new Point2D( 0, 0 ),
	p2	: new Point2D( 0, 0 ),
	p3	: new Point2D( 0, 0 ),


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
	 * @param {Color} color
	 */
	
	draw : function( p1, p2, p3, color )
	{
		this.p1.set( p1 );
		this.p2.set( p2 );
		this.p3.set( p3 );
		
		var bounds	= this.calculateBounds( this.p1, this.p2, this.p3 );
		
		var rx = this.drawHalfTriangle( 
				this.p1, 
				this.p2, 
				this.p3, 
				bounds.lSizeAdder,
				bounds.rSizeAdder,
				this.p1.x + bounds.lSizeAdder / 2,
				this.p1.x,
				color
			);

		this.p2.y++;

		this.drawHalfTriangle( this.p2, this.p3, this.p1, bounds.lSizeAdder2, bounds.rSizeAdder, this.p2.x, rx, color );
	},


	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {Number} lAdder
	 * @param {Number} rAdder
	 * @param {Number} lx
	 * @param {Number} rx
	 * @param {Color} color
	 * @returns {Number}
	 */

	drawHalfTriangle : function( p1, p2, p3, lAdder, rAdder, lx, rx, color )
	{
		var surface		= Draw.getSurface();
		var data		= surface.getData();
		
		var colR		= color.r;
		var colG		= color.g;
		var colB		= color.b;		
		
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

