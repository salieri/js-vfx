
var Draw = {
	
	/**
	 * @type Surface
	 */
	surface		: null,

	/**
	 * @type Color
	 */
	color		: new Color( 255, 0, 0 ),
	
	/**
	 * @type Color
	 */	
	bgColor		: new Color( 64, 64, 64 ),
	
	
	
	/**
	 * @param {Surface} surface
	 */
	
	setSurface : function( surface )
	{
		Draw.surface = surface;
	},
	
	
	/**
	 * @returns {Surface}
	 */
	
	getSurface : function()
	{
		return Draw.surface;
	},
	
	
	beginPaint : function()
	{
		Draw.surface.beginPaint();		
		Draw.clear();
	},
	
	
	endPaint : function()
	{
		Draw.surface.endPaint();
	},
	
	
	/**
	 * @returns {Boolean}
	 */
	
	isDrawing : function()
	{
		return Draw.surface.isDrawing();
	},
	
	
	clear : function()
	{
		Draw.surface.clear( Draw.bgColor );
	},
	

	/**
	 * @param {Point2D} point
	 * @param {Color} color
	 */
	
	setPixel : function( point, color )
	{
		var x = Math.round( point.x );
		var y = Math.round( point.y );
		
		if( ( x < 0 ) || ( y < 0 ) || ( x >= Draw.surface.getWidth() ) || ( y >= Draw.surface.getHeight() ) )
		{
			return;
		}
				
		var data	= Draw.surface.getData();
		var ptr		= ( x + ( y * Draw.surface.getWidth() ) ) * 4;
		
		data[ ptr++ ]	= color.r;
		data[ ptr++ ]	= color.g;
		data[ ptr ]		= color.b;		
	},
	
	
	/**
	 * @param {Point2D} point
	 * @param {Color} color
	 */
	
	blendPixel : function( point, color )
	{
		var x = Math.round( point.x );
		var y = Math.round( point.y );
		
		if( ( x < 0 ) || ( y < 0 ) || ( x >= Draw.surface.getWidth() ) || ( y >= Draw.surface.getHeight() ) )
		{
			return;
		}
		
		var data	= Draw.surface.getData();
		var ptr		= ( x + ( y * Draw.surface.getWidth() ) ) * 4;						
		var ptrpp	= ptr + 1;
		var ptrp2	= ptr + 2;
		var colMul	= color.a / 255;
				
		var rd = ( color.r - data[ ptr ] ) * colMul;
		var gd = ( color.g - data[ ptrpp ] ) * colMul;
		var bd = ( color.b - data[ ptrp2 ] ) * colMul;
		
		data[ ptr ]			+= rd;
		data[ ptrpp ]		+= gd;
		data[ ptrp2 ]		+= bd;
	},

	
	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Color} color
	 */
	
	line : function( p1, p2, color )
	{
		Line.draw( p1, p2, color );
	},
	
	
	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {Color} color
	 */
	
	triangle : function( p1, p2, p3, color )
	{
		// BetterTriangle.draw( p1, p2, p3, color );
		BetterTexturedTriangle.draw( p1, p2, p3, color );
	},

	
	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {Color} c1
	 * @param {Color} c2
	 * @param {Color} c3
	 */
	
	interpolatedTriangle : function( p1, p2, p3, c1, c2, c3 )
	{
		BetterInterpolatedTriangle.draw( p1, p2, p3, c1, c2, c3 );
	},
	
	
	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {Point3D} uv1
	 * @param {Point3D} uv2
	 * @param {Point3D} uv3
	 * @param {CanvasTexture} texture
	 */
	
	texturedTriangle : function( p1, p2, p3, uv1, uv2, uv3, texture )
	{
		TexturedTriangle.draw( p1, p2, p3, uv1, uv2, uv3, texture );
	}
	
	
	
};

