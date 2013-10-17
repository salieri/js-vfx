
var Line = {
	
	calculate : function( p1, p2 )
	{
		var variables = {
				px1			: Math.round( p1.x ),
				py1			: Math.round( p1.y ),
				px2			: Math.round( p2.x ),
				py2			: Math.round( p2.y ),
				done		: false,
				pxStart		: 0,
				lastPlotX	: 0
			};
	
		variables.dx	= Math.abs( variables.px2 - variables.px1 );
		variables.dy	= Math.abs( variables.py2 - variables.py1 );
	
		variables.err	= variables.dx - variables.dy;
		variables.e2	= ( variables.dx - variables.dy ) * 2;
	
		variables.sx	= -1;
		variables.sy	= -1;	
		
		if( variables.px1 < variables.px2 )
		{
			variables.sx = 1;
		}
		
		if( variables.py1 < variables.py2 )
		{
			variables.sy = 1;
		}
		
		return variables;
	},
	
	
	step : function( line )
	{
		line.pxStart		= line.px1;
		
		while( true )
		{
			// plot here
			line.lastPlotX	= line.px1;
			
			if( ( line.px1 === line.px2 ) && ( line.py1 === line.py2 ) )
			{
				line.done = true;
				break;
			}
			
			if( line.e2 > -line.dy )
			{
				line.err	= line.err - line.dy;
				line.e2		= line.err + line.err;				
				
				line.px1		+= line.sx;
			}
			
			if( ( line.px1 === line.px2 ) && ( line.py1 === line.py2 ) )
			{
				// plot here
				line.lastPlotX = line.px1;
				line.done = true;
				break;
			}
			
			if( line.e2 <  line.dx )
			{
				line.err	= line.err + line.dx;
				line.e2		= line.err + line.err;
				
				line.py1	+= line.sy;
				break;
			}
		}
	},
	
	
	
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


