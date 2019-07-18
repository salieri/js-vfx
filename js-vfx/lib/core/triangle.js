import { Point2D } from './point-2d';


export const Triangle = {
  p1: new Point2D(0, 0),
  p2: new Point2D(0, 0),
  p3: new Point2D(0, 0),

  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @protected
   */
  calculateBounds(p1, p2, p3) {
    this.sortPoints(p1, p2, p3);

    return {
      rSizeAdder: (p3.x - p1.x) / (p3.y - p1.y),
      lSizeAdder: (p2.x - p1.x) / (p2.y - p1.y + 1),
      lSizeAdder2: (p3.x - p2.x) / (p3.y - p2.y)
    };
  },


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

    const bounds = this.calculateBounds(this.p1, this.p2, this.p3);

    const rx = this.drawHalfTriangle(
      this.p1,
      this.p2,
      this.p3,
      bounds.lSizeAdder,
      bounds.rSizeAdder,
      this.p1.x + bounds.lSizeAdder / 2,
      this.p1.x,
      color,
      surface
    );

    this.p2.y++;

    this.drawHalfTriangle(this.p2, this.p3, this.p1, bounds.lSizeAdder2, bounds.rSizeAdder, this.p2.x, rx, color,
      surface);
  },


  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @param {Number} lAdder
   * @param {Number} rAdder
   * @param {Number} lx
   * @param {Number} rx
   * @param {Color} color
   * @param {Surface} surface
   * @returns {Number}
   * @protected
   */
  drawHalfTriangle(p1, p2, p3, lAdder, rAdder, lx, rx, color, surface) {
    const data = surface.getData();

    const colR = color.r;
    const colG = color.g;
    const colB = color.b;

    const width = surface.getWidth();
    const height = surface.getHeight();

    let ptr = Math.round(Math.min(lx, rx) + p1.y * width) * 4;

    const minLeftX = Math.min(p1.x, p2.x);
    const maxLeftX = Math.max(p1.x, p2.x);

    const minRightX = Math.min(p1.x, p3.x, p2.x);
    const maxRightX = Math.max(p1.x, p3.x, p2.x);


    for (let y = p1.y; (y <= p2.y) && (y < height); y++) {
      let minX = Math.round(Math.min(lx, rx));
      let maxX = Math.round(Math.max(lx, rx));

      if (y >= 0) {
        if (minX < 0) {
          ptr += Math.abs(minX) * 4;
          minX = 0;
          maxX = Math.max(maxX, minX);
        }

        maxX = Math.min(maxX, width - 1);

        for (let xp = minX; xp <= maxX; xp++) {
          data[ptr] = colR;
          data[ptr + 1] = colG;
          data[ptr + 2] = colB;

          ptr += 4;
        }
      } else {
        ptr += (maxX - minX) * 4 + 4;
      }

      lx += lAdder;
      rx += rAdder;

      lx = Math.max(lx, minLeftX);
      lx = Math.min(lx, maxLeftX);

      rx = Math.max(rx, minRightX);
      rx = Math.min(rx, maxRightX);

      ptr += ((width - maxX) + Math.round(Math.min(lx, rx))) * 4;
      ptr -= 4;
    }

    return rx;
  },


  /**
   * Sort p1, p2, p3 in lowest Y order.
   *
   * Relies on arguments being treated as byref
   *
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @protected
   */
  sortPoints(p1, p2, p3) {
    p1.round();
    p2.round();
    p3.round();

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
