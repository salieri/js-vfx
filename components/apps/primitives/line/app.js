import { App } from '~/lib/core/app';
import { Color } from '~/lib/core/color';
import { Line } from '~/lib/core/line';
import { Draw } from '~/lib/core/draw';
import { Point2D } from '~/lib/core/point-2d';


export class LineApp extends App {
  drawLine(p1, p2, rad) {
    const lineColor = new Color(32, 255, 32);
    const pixelColor = new Color(255, 0, 0, 128);

    Line.draw(p1, p2, lineColor, Draw.getSurface());
    Draw.blendPixel(p1, pixelColor);
    Draw.blendPixel(p2, pixelColor);
  }


  /**
   * @param {float|int|Number} x
   * @param {float|int|Number} y
   * @param {float|int|Number} length
   * @param {float|int|Number} rad
   */
  rotateLine(x, y, length, rad) {
    const lineColor = new Color(20, 123, 255);
    const pixelColor = new Color(255, 236, 7, 255);

    const lx1 = -length / 2;
    const lx2 = length / 2;
    const ly1 = 0;
    const ly2 = 0;

    const p1 = new Point2D(
      x + lx1 * Math.cos(rad) - ly1 * Math.sin(rad),
      y + ly1 * Math.cos(rad) + lx1 * Math.sin(rad)
    );

    const p2 = new Point2D(
      x + lx2 * Math.cos(rad) - ly2 * Math.sin(rad),
      y + ly2 * Math.cos(rad) + lx2 * Math.sin(rad)
    );

    Line.draw(p1, p2, lineColor, Draw.getSurface());

    Draw.blendPixel(p1, pixelColor);
    Draw.blendPixel(p2, pixelColor);
  }

  draw(rad) {
    this.startDrawing();

    Draw.bgColor.set(220, 230, 240);
    Draw.clear();

    this.rotateLine(320, 240, 200, rad);

    /*
    drawLine( new Point2D( 10, 20 ), new Point2D( 30, 40 ) );

    drawLine( new Point2D( 200, 200 ), new Point2D( 500, 200 ) );
    drawLine( new Point2D( 200, 300 ), new Point2D( 500, 300 ) );
    drawLine( new Point2D( 200, 200 ), new Point2D( 200, 300 ) );
    drawLine( new Point2D( 500, 200 ), new Point2D( 500, 300 ) );

    drawLine( new Point2D( 200, 200 ), new Point2D( 500, 300 ) );
    drawLine( new Point2D( 500, 200 ), new Point2D( 200, 300 ) );

    drawLine( new Point2D( 500, 450 ), new Point2D( 200, 449 ) );
    drawLine( new Point2D( 600, 100 ), new Point2D( 601, 400 ) );
    */

    this.endDrawing(true);
  }
}

