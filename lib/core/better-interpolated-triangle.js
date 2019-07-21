import { Point2D } from './point-2d';
import { Color } from './color';
import { Line } from './line';

export const BetterInterpolatedTriangle = {
  p1: new Point2D(),
  p2: new Point2D(),
  p3: new Point2D(),
  c1: new Color(),
  c2: new Color(),
  c3: new Color(),
  c1c2: new Color(),
  c1c3: new Color(),
  c2c3: new Color(),
  colSlider: new Color(),
  cLeft: new Color(),
  cLeft2: new Color(),
  cRight: new Color(),

  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @param {Color} c1
   * @param {Color} c2
   * @param {Color} c3
   * @param {Surface} surface
   */
  draw(p1, p2, p3, c1, c2, c3, surface) {
    this.p1.set(p1);
    this.p2.set(p2);
    this.p3.set(p3);
    this.c1.set(c1);
    this.c2.set(c2);
    this.c3.set(c3);

    this.sortPoints(this.p1, this.p2, this.p3, this.c1, this.c2, this.c3);

    const line12 = Line.calculate(this.p1, this.p2);
    const line13 = Line.calculate(this.p1, this.p3);
    const line23 = Line.calculate(this.p2, this.p3);

    this.c1c2.interpolate(
      this.c1,
      this.c2,
      this.p1.distance(this.p2),
      true
    );

    this.c1c3.interpolate(
      this.c1,
      this.c3,
      this.p1.distance(this.p3),
      true
    );

    this.c2c3.interpolate(
      this.c2,
      this.c3,
      this.p2.distance(this.p3),
      true
    );

    this.c1c2.multiplyByVal(Math.abs(this.p1.distance(this.p2) / (line12.py1 - line12.py2)), true);
    this.c1c3.multiplyByVal(Math.abs(this.p1.distance(this.p3) / (line13.py1 - line13.py2)), true);
    this.c2c3.multiplyByVal(Math.abs(this.p2.distance(this.p3) / (line23.py1 - line23.py2)), true);

    this.cLeft.set(this.c1);
    this.cRight.set(this.c1);
    this.cLeft2.set(this.c2);

    this.cRight.add(this.c1c3, true);

    Line.step(line23);
    this.cLeft2.add(this.c2c3, true);

    this.drawHalf(line12, line13, this.cLeft, this.cRight, this.c1c2, this.c1c3, false, surface);
    this.drawHalf(line23, line13, this.cLeft2, this.cRight, this.c2c3, this.c1c3, true, surface);
  },


  /**
   * @protected
   * @param {object} lineA
   * @param {object} lineB
   * @param {Color} colLeft
   * @param {Color} colRight
   * @param {Color} colAdderLeft
   * @param {Color} colAdderRight
   * @param {boolean} secondHalf
   * @param {Surface} surface
   */
  drawHalf(lineA, lineB, colLeft, colRight, colAdderLeft, colAdderRight, secondHalf, surface) {
    const data = surface.getData();

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

      if ((y >= 0) && (y < height) && (minX <= maxX)) {
        let colR, colG, colB;

        if (Math.min(lineA.lastPlotX, lineA.pxStart) < Math.min(lineB.lastPlotX, lineB.pxStart)) {
          this.colSlider.set(colRight);
          this.colSlider.subtract(colLeft, true);

          colR = colLeft.r;
          colG = colLeft.g;
          colB = colLeft.b;
        } else {
          this.colSlider.set(colLeft);
          this.colSlider.subtract(colRight, true);

          colR = colRight.r;
          colG = colRight.g;
          colB = colRight.b;
        }

        this.colSlider.divideByVal(maxX - minX + 1, true);


        for (let x = minX; x <= maxX; x++) {
          data[ptr++] = Math.min(255, Math.max(0, Math.round(colR)));
          data[ptr++] = Math.min(255, Math.max(0, Math.round(colG)));
          data[ptr++] = Math.min(255, Math.max(0, Math.round(colB)));

          ptr++;

          colR += this.colSlider.r;
          colG += this.colSlider.g;
          colB += this.colSlider.b;
        }
      } else {
        ptr += (maxX - minX + 1) << 2; // jshint ignore:line
      }


      colLeft.add(colAdderLeft, true);
      colRight.add(colAdderRight, true);

      y += lineA.sy;
    }
  },


  /**
   * @protected
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @param {Color} c1
   * @param {Color} c2
   * @param {Color} c3
   */
  sortPoints(p1, p2, p3, c1, c2, c3) {
    if (p3.y < p1.y) {
      p3.swap(p1);
      c3.swap(c1);
    }

    if (p2.y < p1.y) {
      p2.swap(p1);
      c2.swap(c1);
    }

    if (p3.y < p2.y) {
      p3.swap(p2);
      c3.swap(c2);
    }
  }
};

