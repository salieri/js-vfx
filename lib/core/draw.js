// import { Surface } from './surface';
import { Color } from './color';
// import { Point2D } from './point-2d';
// import { Point3D } from './point-3d';
// import { CanvasTexture } from './canvas-texture';
import { Line } from './line';
import { BetterTriangle } from './better-triangle';
import { BetterInterpolatedTriangle } from './better-interpolated-triangle';
import { TexturedTriangle } from './textured-triangle';


export const Draw = {

  /**
   * @type {Surface}
   */
  surface: null,

  /**
   * @type {Color}
   */
  color: new Color(255, 0, 0),

  /**
   * @type {Color}
   */
  bgColor: new Color(64, 64, 64),


  /**
   * @param {Surface} surface
   * @public
   */
  setSurface: function (surface) {
    Draw.surface = surface;
  },


  /**
   * @returns {Surface}
   * @public
   */
  getSurface: function () {
    return Draw.surface;
  },


  /**
   * @public
   */
  beginPaint: function () {
    Draw.surface.beginPaint();
    Draw.clear();
  },


  /**
   * @public
   */
  endPaint: function () {
    Draw.surface.endPaint();
  },


  /**
   * @returns {Boolean}
   * @public
   */

  isDrawing: function () {
    return Draw.surface.isDrawing();
  },


  /**
   * @public
   */
  clear: function () {
    Draw.surface.clear(Draw.bgColor);
  },


  /**
   * @param {Point2D} point
   * @param {Color} color
   * @public
   */
  setPixel: function (point, color) {
    const x = Math.round(point.x);
    const y = Math.round(point.y);

    if ((x < 0) || (y < 0) || (x >= Draw.surface.getWidth()) || (y >= Draw.surface.getHeight())) {
      return;
    }

    const data = Draw.surface.getData();
    let ptr = (x + (y * Draw.surface.getWidth())) * 4;

    data[ptr++] = color.r;
    data[ptr++] = color.g;
    data[ptr] = color.b;
  },


  /**
   * @param {Point2D} point
   * @param {Color} color
   * @public
   */
  blendPixel: function (point, color) {
    const x = Math.round(point.x);
    const y = Math.round(point.y);

    if ((x < 0) || (y < 0) || (x >= Draw.surface.getWidth()) || (y >= Draw.surface.getHeight())) {
      return;
    }

    const data = Draw.surface.getData();
    const ptr = (x + (y * Draw.surface.getWidth())) * 4;
    const ptrpp = ptr + 1;
    const ptrp2 = ptr + 2;
    const colMul = color.a / 255;

    const rd = (color.r - data[ptr]) * colMul;
    const gd = (color.g - data[ptrpp]) * colMul;
    const bd = (color.b - data[ptrp2]) * colMul;

    data[ptr] += rd;
    data[ptrpp] += gd;
    data[ptrp2] += bd;
  },


  blendValue: function (bgValue, fgValue, opacity) {
    if (opacity === 255) {
      return fgValue;
    }

    if (opacity === 0) {
      return bgValue;
    }

    return Math.min(255, Math.max(0, bgValue + Math.round((fgValue - bgValue) * (opacity / 255))));
  },


  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Color} color
   * @public
   */
  line: function (p1, p2, color) {
    Line.draw(p1, p2, color, Draw.surface);
  },


  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @param {Color} color
   * @public
   */
  triangle: function (p1, p2, p3, color) {
    BetterTriangle.draw(p1, p2, p3, color, Draw.surface);
    // BetterTexturedTriangle.draw( p1, p2, p3, color );
  },


  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @param {Color} c1
   * @param {Color} c2
   * @param {Color} c3
   * @public
   */
  interpolatedTriangle: function (p1, p2, p3, c1, c2, c3) {
    BetterInterpolatedTriangle.draw(p1, p2, p3, c1, c2, c3, Draw.surface);
  },


  /**
   * @param {Point2D} p1
   * @param {Point2D} p2
   * @param {Point2D} p3
   * @param {Point3D} uv1
   * @param {Point3D} uv2
   * @param {Point3D} uv3
   * @param {CanvasTexture} texture
   * @public
   */
  texturedTriangle: function (p1, p2, p3, uv1, uv2, uv3, texture) {
    TexturedTriangle.draw(p1, p2, p3, uv1, uv2, uv3, texture, Draw.surface);
  }
};
