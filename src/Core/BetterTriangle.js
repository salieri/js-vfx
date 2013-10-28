/**
 * @class
 */
var BetterTriangle = {
	
	p1	: new Point2D(),
	p2	: new Point2D(),
	p3	: new Point2D(),
	

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
		
		BetterTriangle.sortPoints( this.p1, this.p2, this.p3 );
		
		var line12	= Line.calculate( this.p1, this.p2 );
		var line13	= Line.calculate( this.p1, this.p3 );
		var line23	= Line.calculate( this.p2, this.p3 );
		
		// Line.step( line23 );
		
		BetterTriangle.drawHalf( line12, line13, color, false );		
		BetterTriangle.drawHalf( line23, line13, color, true );
		
	},
	

	drawHalf : function( lineA, lineB, color, secondHalf )
	{		
		var surface		= Draw.getSurface();
		var data		= surface.getData();
		
		var colR		= color.r;
		var colG		= color.g;
		var colB		= color.b;		
		
		var width		= surface.getWidth();
		var height		= surface.getHeight();

		var y			= lineA.py1;
		
		var maxX		= width;
		var minX		= 0;
		
		var ptr			= ( y * width + 1 ) << 2; // * 4
		

		while
		(
			( ( secondHalf === true ) && ( ( lineA.done !== true ) || ( lineB.done !== true ) ) ) ||
			( ( lineA.done !== true ) && ( lineB.done !== true ) )
		)
 		{
			Line.step( lineA );
			Line.step( lineB );
			
			minX = Math.max( 0, Math.min( lineA.lastPlotX, lineA.pxStart, lineB.lastPlotX, lineB.pxStart ) );

			ptr	+= ( width - maxX + minX - 1 ) << 2; // * 4
			
			maxX = Math.min( width - 1, Math.max( lineA.lastPlotX, lineA.pxStart, lineB.lastPlotX, lineB.pxStart ) );
			
			if( ( y >= 0 ) && ( y < height ) )
			{
				for( var x = minX; x <= maxX; x++ )
				{
					data[ ptr++ ]	= colR;
					data[ ptr++ ]	= colG;
					data[ ptr++ ]	= colB;
					
					ptr++;
				}
			}
			else
			{
				ptr += ( maxX - minX + 1 ) << 2; // * 4 
			}
			
			y	+= lineA.sy;
		}
		
		/* if( ( secondHalf === true ) && ( ( lineA.done !== true ) || ( lineB.done !== true ) ) )
		{
			y = y;
		} */
	},
	
	
	sortPoints : function( p1, p2, p3 )
	{
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


