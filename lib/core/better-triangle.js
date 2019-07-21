// import { Color } from './color';
import { Point2D } from './point-2d';
import { Line } from './line';


export const BetterTriangle = {
  p1: new Point2D(),
  p2: new Point2D(),
  p3: new Point2D(),

  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @param {Color} color
   * @param {Surface} surface
   * @public
   */
  draw(p1, p2, p3, color, surface) {
    this.p1.set(p1);
    this.p2.set(p2);
    this.p3.set(p3);

    BetterTriangle.sortPoints(this.p1, this.p2, this.p3);

    const line12 = Line.calculate(this.p1, this.p2);
    const line13 = Line.calculate(this.p1, this.p3);
    const line23 = Line.calculate(this.p2, this.p3);

    // Line.step( line23 );

    BetterTriangle.drawHalf(line12, line13, color, false, surface);
    BetterTriangle.drawHalf(line23, line13, color, true, surface);
  },


  /**
   * @protected
   * @param {object} lineA
   * @param {object} lineB
   * @param {Color} color
   * @param {boolean} secondHalf
   * @param {Surface} surface
   */
  drawHalf(lineA, lineB, color, secondHalf, surface) {
    const data = surface.getData();

    const colR = color.r;
    const colG = color.g;
    const colB = color.b;

    const width = surface.getWidth();
    const height = surface.getHeight();

    let y = lineA.py1;

    let maxX = width;
    let minX = 0;

    let ptr = (y * width + 1) << 2; // jshint ignore:line


    while (
      // eslint-disable-next-line no-unmodified-loop-condition
      ((secondHalf === true) && ((lineA.done !== true) || (lineB.done !== true))) ||
      ((lineA.done !== true) && (lineB.done !== true))
    ) {
      Line.step(lineA);
      Line.step(lineB);

      minX = Math.max(0, Math.min(lineA.lastPlotX, lineA.pxStart, lineB.lastPlotX, lineB.pxStart));

      ptr += (width - maxX + minX - 1) << 2; // jshint ignore:line

      maxX = Math.min(width - 1, Math.max(lineA.lastPlotX, lineA.pxStart, lineB.lastPlotX, lineB.pxStart));

      if ((y >= 0) && (y < height)) {
        for (let x = minX; x <= maxX; x++) {
          data[ptr++] = colR;
          data[ptr++] = colG;
          data[ptr++] = colB;

          ptr++;
        }
      } else {
        ptr += (maxX - minX + 1) << 2; // jshint ignore:line
      }

      y += lineA.sy;
    }

    /* if( ( secondHalf === true ) && ( ( lineA.done !== true ) || ( lineB.done !== true ) ) )
    {
      y = y;
    } */
  },


  /**
   * @protected
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   */
  sortPoints(p1, p2, p3) {
    if (p3.y < p1.y) {
      p3.swap(p1);
    }

    if (p2.y < p1.y) {
      p2.swap(p1);
    }

    if (p3.y < p2.y) {
      p3.swap(p2);
    }
  }
};

