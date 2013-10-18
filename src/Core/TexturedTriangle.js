
var TexturedTriangle = {
	
	p1			: new Point2D(),
	p2			: new Point2D(),
	p3			: new Point2D(),
	uv1			: new Point3D(),
	uv2			: new Point3D(),
	uv3			: new Point3D(),
	uvMul		: new Point3D(),
	uv12		: new Point3D(),
	uv13		: new Point3D(),
	uv23		: new Point3D(),
	uvLeft		: new Point3D(),
	uvRight		: new Point3D(),
	uvLeft2		: new Point3D(),
	uvPos		: new Point3D(),
	uvSlider	: new Point3D(),



	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {Point3D} uv1
	 * @param {Point3D} uv2
	 * @param {Point3D} uv3
	 */

	draw : function( p1, p2, p3, uv1, uv2, uv3, texture )
	{
		this.p1.set( p1 );
		this.p2.set( p2 );
		this.p3.set( p3 );
		this.uv1.set( uv1 );
		this.uv2.set( uv2 );
		this.uv3.set( uv3 );		
		
		this.sortPoints( this.p1, this.p2, this.p3, this.uv1, this.uv2, this.uv3 );
		
		var line12		= Line.calculate( this.p1, this.p2 );
		var line13		= Line.calculate( this.p1, this.p3 );
		var line23		= Line.calculate( this.p2, this.p3 );
		
		// Convert UV 0..1 range to real texture coordinates
		this.uvMul.set( texture.getWidth() - 1, texture.getHeight() - 1, 1 );
		this.uv1.multiply( this.uvMul );
		this.uv2.multiply( this.uvMul );
		this.uv3.multiply( this.uvMul );
		
		this.uv12.interpolate( 
				this.uv1, 
				this.uv2, 
				this.p1.distance( this.p2 ),
				true 
			);
				
		this.uv13.interpolate( 
				this.uv1, 
				this.uv3, 
				this.p1.distance( this.p3 ),
				true 
			);
				
		this.uv23.interpolate( 
				this.uv2, 
				this.uv3,
				this.p2.distance( this.p3 ),				
				true
			);
				
				
		this.uv12.multiplyByVal( Math.abs( this.p1.distance( this.p2 ) / ( line12.py1 - line12.py2  ) ), true );
		this.uv13.multiplyByVal( Math.abs( this.p1.distance( this.p3 ) / ( line13.py1 - line13.py2 ) ), true );
		this.uv23.multiplyByVal( Math.abs( this.p2.distance( this.p3 ) / ( line23.py1 - line23.py2  ) ), true );
		
		Line.step( line23 );
		
		this.uvLeft.set( this.uv1 );
		this.uvRight.set( this.uv1 );
		this.uvLeft2.set( this.uv2 );
		
		this.uvRight.add( this.uv13, true );
		this.uvLeft2.add( this.uv23, true );
				
		this.drawHalf( line12, line13, this.uvLeft, this.uvRight, this.uv12, this.uv13, texture, false );		
		this.drawHalf( line23, line13, this.uvLeft2, this.uvRight, this.uv12, this.uv13, texture, true );
	},
	

	drawHalf : function( lineA, lineB, uvLeft, uvRight, uvAdderLeft, uvAdderRight, texture, secondHalf )
	{		
		var surface		= Draw.getSurface();
		var data		= surface.getData();
		var uvData		= texture.data;
				
		var width		= surface.getWidth();
		var height		= surface.getHeight();

		var uvWidth		= texture.getWidth();
		var uvHeight	= texture.getHeight();

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
						
			if( ( y >= 0 ) && ( y < height ) && ( minX <= maxX ) )
			{
				if( Math.min( lineA.lastPlotX, lineA.pxStart ) < Math.min( lineB.lastPlotX, lineB.pxStart ) )
				{
					this.uvSlider.set( uvRight );
					this.uvSlider.subtract( uvLeft, true );
					this.uvPos.set( uvLeft );
				}
				else
				{
					this.uvSlider.set( uvLeft );
					this.uvSlider.subtract( uvRight, true );
					this.uvPos.set( uvRight );
				}
				
				this.uvSlider.divideByVal( Math.abs( Math.max( maxX - minX + 1 ), 1 ), true );
				
				for( var x = minX; x <= maxX; x++ )
				{
					var uvPtr		= ( Math.round( this.uvPos.y ) * uvWidth + Math.round( this.uvPos.x ) ) << 2;
					
					data[ ptr++ ]	= uvData[ uvPtr ];
					data[ ptr++ ]	= uvData[ uvPtr + 1 ];
					data[ ptr++ ]	= uvData[ uvPtr + 2 ];
					
					ptr++;

					this.uvPos.add( this.uvSlider );
				}
			}
			else
			{
				ptr += ( maxX - minX + 1 ) << 2; // * 4 
			}
			

			uvLeft.add( uvAdderLeft, true );
			uvRight.add( uvAdderRight, true );
			
			y	+= lineA.sy;
		}
	},
	
	
	sortPoints : function( p1, p2, p3, uv1, uv2, uv3 )
	{
		if( p3.y < p1.y )
		{
			p3.swap( p1 );
			uv3.swap( uv1 );
		}
		
		if( p2.y < p1.y )
		{
			p2.swap( p1 );
			uv2.swap( uv1 );
		}
		
		if( p3.y < p2.y )
		{
			p3.swap( p2 );
			uv3.swap( uv2 );
		}
	}
	
	
	
	
};


