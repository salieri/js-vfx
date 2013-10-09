

var Line = {
	
	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Color} color
	 * @link http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
	 */
	
	draw : function( p1, p2, color )
	{
		var px1 = Math.round( p1.x );
		var py1 = Math.round( p1.y );
		var px2 = Math.round( p2.x );
		var py2 = Math.round( p2.y );
		
		var dx = Math.abs( px2 - px1 );
		var dy = Math.abs( py2 - py1 );
		
		var sx = -1;
		var sy = -1;
		
		if( px1 < px2 )
		{
			sx = 1;
		}
		
		if( py1 < py2 )
		{
			sy = 1;
		}

		var sx4		= sx * 4;
		
		var surface	= Draw.getSurface();
		var data	= surface.getData();

		var width	= surface.getWidth();
		var height	= surface.getHeight();
		
		var err		= dx - dy;
		var e2		= err * 2;
		var ptr		= ( px1 + py1 * width ) * 4;
		var lineAdd	= ( sy * width ) * 4;
 
 		var colR	= color.r;
		var colG	= color.g;
		var colB	= color.b;
 
		while( true )
		{
			if( ( px1 >= 0 ) && ( px1 < width ) && ( py1 >= 0 ) && ( py1 < height ) )
			{
				data[ ptr ]		= colR;
				data[ ptr + 1 ]	= colG;
				data[ ptr + 2 ]	= colB;
			}
			
			if( ( px1 === px2 ) && ( py1 === py2 ) )
			{
				break;
			}
			
			if( e2 > -dy )
			{
				err	= err - dy;
				e2	= err + err;				
				
				px1	+= sx;				
				ptr += sx4;
			}			
			
			if( ( px1 === px2 ) && ( py1 === py2 ) )
			{
				if( ( px1 >= 0 ) && ( px1 < width ) && ( py1 >= 0 ) && ( py1 < height ) )
				{
					data[ ptr ]		= colR;
					data[ ptr + 1 ]	= colG;				
					data[ ptr + 2 ]	= colB;
				}
				
				break;
			}
			
			if( e2 <  dx )
			{
				err = err + dx;
				e2	= err + err;
				
				py1 += sy;				
				ptr += lineAdd;
			}			
		}
	}
	
};


