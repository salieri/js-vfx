import { Point2D } from './point-2d';
import { Point3D } from './point-3d';

import { Line } from './line';
import { Draw } from './draw';

throw new Error('DO NOT USE');

// eslint-disable-next-line no-unreachable
export const BetterTexturedTriangle = {
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
   * @param {Surface} surface
   */
  draw(p1, p2, p3, color) {
    this.p1.set(p1);
    this.p2.set(p2);
    this.p3.set(p3);
    /*
    this.uv1.set( uv1 );
    this.uv2.set( uv2 );
    this.uv3.set( uv3 );
    */

    this.sortPoints(this.p1, this.p2, this.p3, this.uv1, this.uv2, this.uv3);

    const midPoint = new Point2D(
      this.p1.x + ((this.p2.y - this.p1.y) / (this.p3.y - this.p1.y)) * (this.p3.x - this.p1.x),
      this.p2.y
    );


    this.drawHalf2(this.p1, this.p2, midPoint, color);
    this.drawHalf2(this.p3, this.p2, midPoint, color);
  },


  drawHalf2(p1, p2, p3, color) {
    const surface = Draw.getSurface();
    const data = surface.getData();

    let dxLeft = Math.abs((p3.x - p1.x) + 1) / (Math.abs(p3.y - p1.y) + 1);
    let dxRight = Math.abs((p2.x - p1.x) + 1) / (Math.abs(p2.y - p1.y) + 1);

    if (p3.x - p1.x < 0) {
      dxLeft = -dxLeft;
    }

    if (p2.x - p1.x < 0) {
      dxRight = -dxRight;
    }

    if (dxLeft > dxRight) {
      const tmp = dxLeft;
      dxLeft = dxRight;
      dxRight = tmp;
    }

    let minX = p1.x;
    let maxX = p1.x;

    const colR = color.r;
    const colG = color.g;
    const colB = color.b;

    let sy = 1;

    if (p3.y < p1.y) {
      sy = -1;
    }

    const yMax = Math.max(Math.round(p1.y), Math.round(p3.y));
    const yMin = Math.min(Math.round(p1.y), Math.round(p3.y));


    for (let y = Math.round(p1.y); (y <= yMax) && (y >= yMin); y += sy) {
      if ((y >= 0) && (y < surface.getHeight())) {
        let minPlotX = Math.round(minX);
        let maxPlotX = Math.round(maxX);

        if (
          (minPlotX < surface.getWidth()) &&
          (maxPlotX >= 0)
        ) {
          if (minPlotX < 0) {
            minPlotX -= minPlotX;
          }

          if (maxPlotX >= surface.getWidth()) {
            maxPlotX -= maxPlotX - (surface.getWidth() - 1);
          }

          for (let x = minPlotX; x <= maxPlotX; x++) {
            let ptr = (y * surface.getWidth() + x) * 4;

            data[ptr++] = colR;
            data[ptr++] = colG;
            data[ptr++] = colB;

            // ptr++;
          }
        }
      }

      minX += dxLeft;
      maxX += dxRight;
    }
  },


  interpolate(line, uv1, uv2, resultLine) {
    /*
      this.pd.x = line.px2 - line.px1;
      this.pd.y = line.py2 - line.py1;

      this.ud.set( uv2 );
      this.ud.subtract( uv1 );

      resultLine.x = this.ud.x / this.pd.x * this.pd.x / ( this.pd.y );
      resultLine.y = this.ud.y / this.pd.y * this.pd.y / ( this.pd.y );
    */
    resultLine.x = (uv2.x - uv1.x) / (line.dy * line.sy);
    resultLine.y = (uv2.y - uv1.y) / (line.dy * line.sy);
  },


  drawHalf(lineA, lineB, uvLeft, uvRight, uvAdderLeft, uvAdderRight, texture, secondHalf) {
    const surface = Draw.getSurface();
    const data = surface.getData();
    const uvData = texture.data;

    const width = surface.getWidth();
    const height = surface.getHeight();

    const uvWidth = texture.getWidth();
    // const uvHeight = texture.getHeight();

    let y = lineA.py1;

    let maxX = width;
    let minX = 0;

    let ptr = (y * width + 1) << 2; // * 4


    while (
      // eslint-disable-next-line no-unmodified-loop-condition
      ((secondHalf === true) && ((lineA.done !== true) || (lineB.done !== true))) ||
      ((lineA.done !== true) && (lineB.done !== true))
    ) {
      Line.step(lineA);
      Line.step(lineB);

      minX = Math.max(0, Math.min(lineA.lastPlotX, lineA.pxStart, lineB.lastPlotX, lineB.pxStart));

      ptr += (width - maxX + minX - 1) << 2; // * 4

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

        this.uvSlider.divideByVal(Math.abs(Math.max(maxX - minX + 1), 1), true);

        for (let x = minX; x <= maxX; x++) {
          const uvPtr = (Math.round(this.uvPos.y) * uvWidth + Math.round(this.uvPos.x)) << 2;

          data[ptr++] = uvData[uvPtr];
          data[ptr++] = uvData[uvPtr + 1];
          data[ptr++] = uvData[uvPtr + 2];

          // ptr++;

          this.uvPos.add(this.uvSlider);
        }
      } else {
        ptr += (maxX - minX + 1) << 2; // * 4
      }


      uvLeft.add(uvAdderLeft, true);
      uvRight.add(uvAdderRight, true);

      y += lineA.sy;
    }

    uvLeft.subtract(uvAdderLeft, true);
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
