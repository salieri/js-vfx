import { Point3D } from './point-3d';
import { Vector3D } from './vector-3d';


export class Point2D {
  /**
   * @param {int|float|Number|Vector3D|Point3D|Point2D} [x=0]
   * @param {int|float|Number} [y=0]
   * @constructor
   */
  constructor(x, y) {
    if ((x instanceof Vector3D) || (x instanceof Point3D) || (x instanceof Point2D)) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x || 0;
      this.y = y || 0;
    }
  }

  /**
   * @returns {Point2D}
   * @public
   */
  clone() {
    return new Point2D(this.x, this.y);
  }


  /**
   * @param {Point2D} p
   * @public
   */
  swap(p) {
    const tx = p.x;
    const ty = p.y;

    p.x = this.x;
    p.y = this.y;

    this.x = tx;
    this.y = ty;
  }


  /**
   * @public
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }


  /**
   * @param {int|float|Number|Vector3D|Point3D|Point2D} [x=0]
   * @param {int|float|Number} [y=0]
   * @public
   */
  set(x, y) {
    if ((x instanceof Vector3D) || (x instanceof Point3D) || (x instanceof Point2D)) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }


  /**
   * @param {Point2D} point
   * @public
   */
  distance(point) {
    const a = point.x - this.x;
    const b = point.y - this.y;

    return Math.sqrt(a * a + b * b);
  }


  /**
   * @param {Point2D} point
   * @public
   */
  subtract(point) {
    this.x -= point.x;
    this.y -= point.y;
  }


  /**
   * @param {Point2D} point
   * @public
   */
  add(point) {
    this.x += point.x;
    this.y += point.y;
  }


  /**
   * @param {int|float|number} val
   * @public
   */
  multiplyByVal(val) {
    this.x *= val;
    this.y *= val;
  }
}

