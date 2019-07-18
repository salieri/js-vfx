
define( [ 'Core/Color', 'Core/Point2D', 'Core/Line' ],

function( Color, Point2D, Line )
{
	'use strict';

	/**
	 * @namespace
	 */
	var BetterTriangle = {

		p1	: new Point2D(),
		p2	: new Point2D(),
		p3	: new Point2D(),


		/**
		 * @param {Point2d} p1
		 * @param {Point2d} p2
		 * @param {Point2d} p3
		 * @param {Color} color
		 * @param {Surface} surface
		 * @public
		 */
		draw : function( p1, p2, p3, color, surface )
		{
			this.p1.set( p1 );
			this.p2.set( p2 );
			this.p3.set( p3 );

			BetterTriangle.sortPoints( this.p1, this.p2, this.p3 );

			var line12	= Line.calculate( this.p1, this.p2 );
			var line13	= Line.calculate( this.p1, this.p3 );
			var line23	= Line.calculate( this.p2, this.p3 );

			// Line.step( line23 );

			BetterTriangle.drawHalf( line12, line13, color, false, surface );
			BetterTriangle.drawHalf( line23, line13, color, true, surface );

		},


		/**
		 * @protected
		 * @param {object} lineA
		 * @param {object} lineB
		 * @param {Color} color
		 * @param {boolean} secondHalf
		 * @param {Surface} surface
		 */
		drawHalf : function( lineA, lineB, color, secondHalf, surface )
		{
			var data		= surface.getData();

			var colR		= color.r;
			var colG		= color.g;
			var colB		= color.b;

			var width		= surface.getWidth();
			var height		= surface.getHeight();

			var y			= lineA.py1;

			var maxX		= width;
			var minX		= 0;

			var ptr			= ( y * width + 1 ) << 2; // jshint ignore:line


			while
			(
				( ( secondHalf === true ) && ( ( lineA.done !== true ) || ( lineB.done !== true ) ) ) ||
				( ( lineA.done !== true ) && ( lineB.done !== true ) )
			)
			{
				Line.step( lineA );
				Line.step( lineB );

				minX = Math.max( 0, Math.min( lineA.lastPlotX, lineA.pxStart, lineB.lastPlotX, lineB.pxStart ) );

				ptr	+= ( width - maxX + minX - 1 ) << 2; // jshint ignore:line

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
					ptr += ( maxX - minX + 1 ) << 2; // jshint ignore:line
				}

				y	+= lineA.sy;
			}

			/* if( ( secondHalf === true ) && ( ( lineA.done !== true ) || ( lineB.done !== true ) ) )
			{
				y = y;
			} */
		},


		/**
		 * @protected
		 * @param {Point2d} p1
		 * @param {Point2d} p2
		 * @param {Point2d} p3
		 */
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


	return BetterTriangle;

} );

