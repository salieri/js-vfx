import { Point2D } from './point-2d';
import { Point3D } from './point-3d';
import { Line } from './line';

export const TexturedTriangle = {
  p1: new Point2D(),
  p2: new Point2D(),
  p3: new Point2D(),
  uv1: new Point3D(),
  uv2: new Point3D(),
  uv3: new Point3D(),
  uvMul: new Point3D(),
  uv12: new Point3D(),
  uv13: new Point3D(),
  uv23: new Point3D(),
  uvLeft: new Point3D(),
  uvRight: new Point3D(),
  uvLeft2: new Point3D(),
  uvPos: new Point3D(),
  uvSlider: new Point3D(),
  ud: new Point2D(),
  pd: new Point2D(),


  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @param {Point3D} uv1
   * @param {Point3D} uv2
   * @param {Point3D} uv3
   * @param {Texture} texture
   * @param {Surface} surface
   */

  draw(p1, p2, p3, uv1, uv2, uv3, texture, surface) {
    this.p1.set(p1);
    this.p2.set(p2);
    this.p3.set(p3);
    this.uv1.set(uv1);
    this.uv2.set(uv2);
    this.uv3.set(uv3);

    this.sortPoints(this.p1, this.p2, this.p3, this.uv1, this.uv2, this.uv3);

    const line12 = Line.calculate(this.p1, this.p2);
    const line13 = Line.calculate(this.p1, this.p3);
    const line23 = Line.calculate(this.p2, this.p3);

    // Convert UV 0..1 range to real texture coordinates
    this.uvMul.set(texture.getWidth() - 1, texture.getHeight() - 1, 1);
    this.uv1.multiply(this.uvMul);
    this.uv2.multiply(this.uvMul);
    this.uv3.multiply(this.uvMul);

    this.uv1.round();
    this.uv2.round();
    this.uv3.round();

    this.interpolate(line12, this.uv1, this.uv2, this.uv12);
    this.interpolate(line13, this.uv1, this.uv3, this.uv13);
    this.interpolate(line23, this.uv2, this.uv3, this.uv23);

    Line.step(line23);

    this.uvLeft.set(this.uv1);
    this.uvRight.set(this.uv1);
    this.uvLeft2.set(this.uv2);

    const uv12Length = Math.sqrt(
      (this.uv2.x - this.uv1.x) * (this.uv2.x - this.uv1.x) +
      (this.uv2.y - this.uv1.y) * (this.uv2.y - this.uv1.y)
    );

    const uv13Length = Math.sqrt(
      (this.uv3.x - this.uv1.x) * (this.uv3.x - this.uv1.x) +
      (this.uv3.y - this.uv1.y) * (this.uv3.y - this.uv1.y)
    );

    const uv23Length = Math.sqrt(
      (this.uv3.x - this.uv2.x) * (this.uv3.x - this.uv2.x) +
      (this.uv3.y - this.uv2.y) * (this.uv3.y - this.uv2.y)
    );

    this.uvRight.add(this.uv13, true);
    this.uvLeft.add(this.uv12, true);
    this.uvLeft2.add(this.uv23);

    this.drawHalf(line12, line13, this.uvLeft, this.uvRight, this.uv12, this.uv13, texture, false, uv12Length,
      uv13Length, surface);
    this.drawHalf(line23, line13, this.uvLeft2, this.uvRight, this.uv23, this.uv13, texture, true, uv23Length,
      uv13Length, surface);
  },


  /**
   * @protected
   * @param {object} line
   * @param {Point3D} uv1
   * @param {Point3D} uv2
   * @param {Point3D} resultLine
   */
  interpolate(line, uv1, uv2, resultLine) {
    resultLine.x = (uv2.x - uv1.x) / ((line.dy + 1) * line.sy);
    resultLine.y = (uv2.y - uv1.y) / ((line.dy + 1) * line.sy);
  },


  /**
   * @protected
   * @param {object} lineA
   * @param {object} lineB
   * @param {Point3D} uvLeft
   * @param {Point3D} uvRight
   * @param {Point3D} uvAdderLeft
   * @param {Point3D} uvAdderRight
   * @param {Material} texture
   * @param {Boolean} secondHalf
   * @param {Number} uvLeftLength
   * @param {Number} uvRightLength
   * @param {Surface} surface
   */
  drawHalf(lineA, lineB, uvLeft, uvRight, uvAdderLeft, uvAdderRight, texture, secondHalf, uvLeftLength, uvRightLength,
    surface) {
    if ((!surface) || (!texture)) {
      return;
    }

    const data = surface.getData();
    const uvData = texture.data;

    if ((!data) || (!uvData)) {
      return;
    }

    const width = surface.getWidth();
    const height = surface.getHeight();

    const uvWidth = texture.getWidth();

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
        if (Math.min(lineA.lastPlotX, lineA.pxStart) < Math.min(lineB.lastPlotX, lineB.pxStart)) {
          this.uvSlider.set(uvRight);
          this.uvSlider.subtract(uvLeft, true);
          this.uvPos.set(uvLeft);
        } else {
          this.uvSlider.set(uvLeft);
          this.uvSlider.subtract(uvRight, true);
          this.uvPos.set(uvRight);
        }

        this.uvSlider.divideByVal(Math.max(maxX - minX + 1, 1));

        // y = y; // debug

        for (let x = minX; x <= maxX; x++) {
          const uvX = Math.round(this.uvPos.x);
          const uvY = Math.round(this.uvPos.y);

          const uvPtr = (uvY * uvWidth + uvX) << 2; // jshint ignore:line

          data[ptr++] = uvData[uvPtr];
          data[ptr++] = uvData[uvPtr + 1];
          data[ptr++] = uvData[uvPtr + 2];

          ptr++;

          this.uvPos.add(this.uvSlider);
        }

        this.uvPos.subtract(this.uvSlider);
        // y = y; // debug
      } else {
        ptr += (maxX - minX + 1) << 2; // jshint ignore:line
      }


      uvLeft.add(uvAdderLeft);
      uvRight.add(uvAdderRight);

      y += lineA.sy;
    }

    uvLeft.subtract(uvAdderLeft);
    uvRight.subtract(uvAdderRight);
    // uvRightOrig.set( uvRight );
  },


  sortPoints(p1, p2, p3, uv1, uv2, uv3) {
    if (p3.y < p1.y) {
      p3.swap(p1);
      uv3.swap(uv1);
    }

    if (p2.y < p1.y) {
      p2.swap(p1);
      uv2.swap(uv1);
    }

    if (p3.y < p2.y) {
      p3.swap(p2);
      uv3.swap(uv2);
    }
  }
};
