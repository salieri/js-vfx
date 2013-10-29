/**
 * @class
 */
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
	ud			: new Point2D(),
	pd			: new Point2D(),



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
		
		this.uv1.round();
		this.uv2.round();
		this.uv3.round();
	
		this.interpolate( line12, this.uv1, this.uv2, this.uv12 );
		this.interpolate( line13, this.uv1, this.uv3, this.uv13 );
		this.interpolate( line23, this.uv2, this.uv3, this.uv23 );

		Line.step( line23 );
		
		this.uvLeft.set( this.uv1 );
		this.uvRight.set( this.uv1 );
		this.uvLeft2.set( this.uv2 );

		var uv12Length = Math.sqrt(
				( this.uv2.x - this.uv1.x ) * ( this.uv2.x - this.uv1.x ) +
				( this.uv2.y - this.uv1.y ) * ( this.uv2.y - this.uv1.y )
			);

		var uv13Length = Math.sqrt(
				( this.uv3.x - this.uv1.x ) * ( this.uv3.x - this.uv1.x ) +
				( this.uv3.y - this.uv1.y ) * ( this.uv3.y - this.uv1.y )
		);

		var uv23Length = Math.sqrt(
				( this.uv3.x - this.uv2.x ) * ( this.uv3.x - this.uv2.x ) +
				( this.uv3.y - this.uv2.y ) * ( this.uv3.y - this.uv2.y )
		);

		this.uvRight.add( this.uv13, true );
		this.uvLeft.add( this.uv12, true );
		this.uvLeft2.add( this.uv23 )

		//this.uv23.set( -30.5, 30.5, 0 );

		// this.uvLeft2.add( this.uv23, true );
		// this.uvLeft2.add( this.uv23, true );


		// this.uvRight.add( this.uv13, true );
		// this.uvLeft.add( this.uv12, true );

		this.drawHalf( line12, line13, this.uvLeft, this.uvRight, this.uv12, this.uv13, texture, false, uv12Length, uv13Length );
	 	this.drawHalf( line23, line13, this.uvLeft2, this.uvRight, this.uv23, this.uv13, texture, true, uv23Length, uv13Length );
	},
	
	
	interpolate : function( line, uv1, uv2, resultLine )
	{
		var d = Math.sqrt(
				( uv2.x - uv1.x ) * ( uv2.x - uv1.x ) +
				( uv2.y - uv1.y ) * ( uv2.y - uv1.y )
		);


		/* resultLine.x = ( uv2.x - uv1.x ) / d;
		resultLine.y = ( uv2.y - uv1.y ) / d;*/

		resultLine.x = ( uv2.x - uv1.x ) / ( ( line.dy + 1 ) * line.sy );
		resultLine.y = ( uv2.y - uv1.y ) / ( ( line.dy + 1 ) * line.sy );
	},


	/**
	 * @param lineA
	 * @param lineB
	 * @param {Point3D} uvLeft
	 * @param {Point3D} uvRight
	 * @param {Point3D} uvAdderLeft
	 * @param {Point3D} uvAdderRight
	 * @param {Material} texture
	 * @param {Boolean} secondHalf
	 * @param {Number} uvLeftLength
	 * @param {Number} uvRightLength
	 */

	drawHalf : function( lineA, lineB, uvLeft, uvRight, uvAdderLeft, uvAdderRight, texture, secondHalf, uvLeftLength, uvRightLength )
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

		// var uvRight		= new Point3D();

		while
		(
			( ( secondHalf === true ) && ( ( lineA.done !== true ) || ( lineB.done !== true ) ) ) ||
			( ( lineA.done !== true ) && ( lineB.done !== true ) )
		)
 		{
			Line.step( lineA );
			Line.step( lineB );

			/* var traversePointA = lineA.traverseLength - Math.sqrt(
					(lineA.px2 - lineA.px1) * (lineA.px2 - lineA.px1) +
							(lineA.py2 - lineA.py2) * (lineA.py2 - lineA.py1)
			);

			var traversePointB = lineB.traverseLength - Math.sqrt(
					(lineB.px2 - lineB.px1) * (lineB.px2 - lineB.px1) +
							(lineB.py2 - lineB.py2) * (lineB.py2 - lineB.py1)
			);

			var uvLeft = new Point3D( uvAdderLeft );
			uvLeft.multiplyByVal( ( lineA.traversed / lineA.traverseLength ) * uvLeftLength );
			uvLeft.add( uvLeftOrig );

			uvRight = new Point3D( uvAdderRight );
			uvRight.multiplyByVal( ( lineB.traversed / lineB.traverseLength ) * uvRightLength );
			uvRight.add( uvRightOrig ); */


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
				
				this.uvSlider.divideByVal( Math.max( maxX - minX + 1, 1 ) );

				y = y;
				
				for( var x = minX; x <= maxX; x++ )
				{
					var uvX = Math.round( this.uvPos.x );
					var uvY = Math.round( this.uvPos.y );

					var uvPtr		= ( uvY * uvWidth + uvX ) << 2;
					
					data[ ptr++ ]	= uvData[ uvPtr ];
					data[ ptr++ ]	= uvData[ uvPtr + 1 ];
					data[ ptr++ ]	= uvData[ uvPtr + 2 ];
					
					ptr++;

					this.uvPos.add( this.uvSlider );
				}

				this.uvPos.subtract( this.uvSlider );
				y = y;
			}
			else
			{
				ptr += ( maxX - minX + 1 ) << 2; // * 4 
			}
			

			uvLeft.add( uvAdderLeft );
			uvRight.add( uvAdderRight );
			
			y	+= lineA.sy;
		}
		
		uvLeft.subtract( uvAdderLeft );
		uvRight.subtract( uvAdderRight );
		// uvRightOrig.set( uvRight );
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


