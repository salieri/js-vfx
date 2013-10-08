

var Line = {
	
	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Color} color
	 */
	
	draw : function( p1, p2, color )
	{
		if( p2.y < p1.y )
		{
			p2.swap( p1 );
		}
		
		var scanlineWidth	= ( p2.x - p1.x + 1 ) / ( p2.y - p1.y + 1 );
		var scanlineAdder	= Math.round( scanlineWidth );
		var scanlineAbs		= Math.abs( scanlineAdder );
		var scanlineAdder4	= Math.round( Math.min( scanlineWidth, 0 ) ) * 8;
		
		if( scanlineAbs === 0 )
		{
			scanlineAbs		= 1;
			scanlineAdder4	= 0;
			
			if( Math.abs( p2.x - p1.x ) === 0 )
			{
				scanlineWidth = 0;
			}
			else
			{
				scanlineWidth	= ( p2.x - p1.x ) / ( p2.y - p1.y + 1 );
			}
		}
		
		var scanlineAbs4	= scanlineAbs * 4;
		
		var surface	= Draw.getSurface();
		var data	= surface.getData();

		var width	= surface.getWidth();
		var height	= surface.getHeight();
		var width4	= width * 4;

		var ptr		= Math.round( p1.x + p1.y * width ) * 4;
		
		var colR	= color.r;
		var colG	= color.g;
		var colB	= color.b;
		
		var xp		= p1.x;		
		var maxX	= Math.max( p1.x, p2.x );
		var minX	= Math.min( p1.x, p2.x );
		
		if( scanlineWidth < 0 )
		{
			xp	-= ( scanlineAbs - 1 );
			ptr	+= Math.round( scanlineWidth + 1 ) * 4;
		}
		
		var oldXP = Math.round( xp );
		var curXP = oldXP;
		var realX = oldXP;
		var curLineMax = scanlineAbs;
		
		
		for( var y = p1.y; y <= p2.y; y++ )
		{
			if( ( y >= 0 ) && ( y < height ) )
			{
				var xStart	= 0;
				var lineMax	= curLineMax;
				
				if( realX < 0 )
				{
					xStart	= -realX;
					ptr		+= xStart * 4;
				}
				
				if( realX < minX )
				{
					xStart	+= minX - realX;
					ptr		+= ( minX - realX ) * 4;
				}
				
				
				if( realX + lineMax > width )
				{
					lineMax -= ( realX + lineMax ) - width;
				}
				
				if( realX + lineMax > maxX )
				{
					lineMax -= ( realX + lineMax ) - ( maxX + 1 );
				}
				
				for( var x = xStart; x < lineMax; x++ )
				{
					data[ ptr++ ]	= colR;
					data[ ptr++ ]	= colG;
					data[ ptr++ ]	= colB;

					ptr++;
				}				
				
				if( lineMax < scanlineAbs )
				{
					ptr += ( scanlineAbs - lineMax ) * 4;
				}
			}
			else
			{
				ptr += scanlineAbs4;
			}
			
			ptr		+= width4;
			xp		+= scanlineWidth;			
			curXP	= Math.round( xp );
			
			if( curXP !== oldXP )
			{
				ptr		+= ( scanlineAdder4 );
				realX	+= scanlineAdder;
				oldXP	= curXP;				
			}
			else
			{
				ptr	-= scanlineAbs4;
			}
		}
	}
	
	
};


