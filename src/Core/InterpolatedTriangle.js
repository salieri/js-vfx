
var InterpolatedTriangle = {

	p1		: new Point2D( 0, 0, 0 ),
	p2		: new Point2D( 0, 0, 0 ),
	p3		: new Point2D( 0, 0, 0 ),
	
	c1		: new Color( 0, 0, 0 ),
	c2		: new Color( 0, 0, 0 ),
	c3		: new Color( 0, 0, 0 ),
	cIntL	: new Color( 0, 0, 0 ),
	cIntR	: new Color( 0, 0, 0 ),
	


	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {Color} c1
	 * @param {Color} c2
	 * @param {Color} c3
	 */
	
	calculateBounds : function( p1, p2, p3, c1, c2, c3 )
	{
		this.sortPoints( p1, p2, p3, c1, c2, c3 );
		
		return {
				rSizeAdder	: ( p3.x - p1.x ) / ( p3.y - p1.y ),
				lSizeAdder	: ( p2.x - p1.x ) / ( p2.y - p1.y + 1 ),
				lSizeAdder2	: ( p3.x - p2.x ) / ( p3.y - p2.y ),
				
				rColAdder	: new Color( 
									( c3.r - c1.r ) / ( p3.y - p1.y ),
									( c3.g - c1.g ) / ( p3.y - p1.y ),
									( c3.b - c1.b ) / ( p3.y - p1.y )
								),
						
				lColAdder	: new Color( 
									( c2.r - c1.r ) / ( p2.y - p1.y + 1 ),
									( c2.g - c1.g ) / ( p2.y - p1.y + 1 ),
									( c2.b - c1.b ) / ( p2.y - p1.y + 1 )
								),
						
				lColAdder2	: new Color( 
									( c3.r - c2.r ) / ( p3.y - p2.y ),
									( c3.g - c2.g ) / ( p3.y - p2.y ),
									( c3.b - c2.b ) / ( p3.y - p2.y )
								)
			};
	},



	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {Color} c1
	 * @param {Color} c2
	 * @param {Color} c3
	 */
	
	draw : function( p1, p2, p3, c1, c2, c3 )
	{
		this.p1.set( p1 );
		this.p2.set( p2 );
		this.p3.set( p3 );
		
		this.c1.set( c1 );
		this.c2.set( c2 );
		this.c3.set( c3 );

		var bounds	= this.calculateBounds( this.p1, this.p2, this.p3, this.c1, this.c2, this.c3 );
		
		this.cIntL.set( this.c1 );		
		this.cIntR.set( this.c1 );
		// this.cIntR.add( bounds.rColAdder );
		

		
		
		var rx = this.drawHalfTriangle( 
				this.p1, 
				this.p2, 
				this.p3, 
				bounds.lSizeAdder,
				bounds.rSizeAdder,
				this.p1.x + bounds.lSizeAdder / 2,
				this.p1.x,
				this.cIntL,
				this.cIntR,
				bounds.lColAdder,
				bounds.rColAdder				
			);

		this.p2.y++;

		this.drawHalfTriangle( 
				this.p2, 
				this.p3, 
				this.p1, 
				bounds.lSizeAdder2, 
				bounds.rSizeAdder, 
				this.p2.x, 
				rx, 
				this.cIntL,
				this.cIntR,
				bounds.lColAdder2,
				bounds.rColAdder
			);
	},


	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {float} lAdder
	 * @param {float} rAdder
	 * @param {float} rx
	 * @param {Color} color
	 * @returns {Number}
	 */

	drawHalfTriangle : function( p1, p2, p3, lAdder, rAdder, lx, rx, colLeft, colRight, colLeftAdder, colRightAdder )
	{
		var surface		= Draw.getSurface();
		var data		= surface.getData();
		
		/*var colR		= color.r;
		var colG		= color.g;
		var colB		= color.b;*/
		
		var width		= surface.getWidth();
		var height		= surface.getHeight();
		
		var ptr			= Math.round( Math.min( lx, rx ) + p1.y * width ) * 4;

		var minLeftX	= Math.min( p1.x, p2.x );
		var maxLeftX	= Math.max( p1.x, p2.x );

		var minRightX	= Math.min( p1.x, p3.x, p2.x );
		var maxRightX	= Math.max( p1.x, p3.x, p2.x );		
		
		var colAdder	= new Color();
		
		var colR, colG, colB;

		
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

				var distance = maxX - minX;
				
				if( distance !== 0 )
				{
					if( lx < rx )
					{
						colR = colLeft.r;
						colG = colLeft.g;
						colB = colLeft.b;			

						colAdder.set(
								( colRight.r - colLeft.r ) / distance,
								( colRight.g - colLeft.g ) / distance,
								( colRight.b - colLeft.b ) / distance
							);
					}
					else
					{
						colR = colRight.r;
						colG = colRight.g;
						colB = colRight.b;			
						
						colAdder.set(
								( colLeft.r - colRight.r ) / distance,
								( colLeft.g - colRight.g ) / distance,
								( colLeft.b - colRight.b ) / distance
							);
					}
				}
				
				
				for( var xp = minX; xp <= maxX; xp++ )
				{
					data[ ptr ]		= Math.round( colR );
					data[ ptr + 1 ]	= Math.round( colG );
					data[ ptr + 2 ]	= Math.round( colB );

					ptr += 4;
					
					colR += colAdder.r;
					colG += colAdder.g;
					colB += colAdder.b;
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
			
			colLeft.add( colLeftAdder );
			colRight.add( colRightAdder );
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
	 * @param {Color} c1
	 * @param {Color} c2
	 * @param {Color} c3
	 */
	
	sortPoints : function( p1, p2, p3, c1, c2, c3 )
	{
		p1.round();
		p2.round();
		p3.round();
		
		if( p3.y < p1.y )
		{
			p3.swap( p1 );
			c3.swap( c1 );
		}
		
		if( p2.y < p1.y )
		{
			p2.swap( p1 );
			c2.swap( c1 );
		}
		
		if( p3.y < p2.y )
		{
			p3.swap( p2 );
			c3.swap( c2 );
		}
	}
};

