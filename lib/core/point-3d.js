export class Point3D {
  /**
   * @param {int|float|Number|Vector3D|Point3D} [x=0]
   * @param {int|float|Number} [y=0]
   * @param {int|float|Number} [z=0]
   * @constructor
   */
  constructor(x, y, z) {
    // works with Vector3D too, since it's a subclass
    if (x instanceof Point3D) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  };


  /**
   * @returns {Point3D}
   * @public
   */
  clone() {
    return new Point3D(this.x, this.y, this.z);
  }


  /**
   * @param {Point3D} p
   * @public
   */
  swap(p) {
    const tx = p.x;
    const ty = p.y;
    const tz = p.z;

    p.x = this.x;
    p.y = this.y;
    p.z = this.z;

    this.x = tx;
    this.y = ty;
    this.z = tz;
  }


  /**
   * @public
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
  }


  /**
   * @public
   */
  normalize() {
    const d = Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));

    this.x = this.x * (1.0 / d);
    this.y = this.y * (1.0 / d);
    this.z = this.z * (1.0 / d);
  }


  /**
   * @param {int|float|Number|Vector3D|Point3D} x
   * @param {int|float|Number} [y]
   * @param {int|float|Number} [z]
   * @public
   */
  set(x, y, z) {
    if (x instanceof Point3D) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }


  /**
   * @param {Point3D|Vector3D} point
   * @public
   */
  add(point) {
    this.x += point.x;
    this.y += point.y;
    this.z += point.z;
  }


  /**
   * @param {Point3D|Vector3D} point
   * @public
   */
  subtract(point) {
    this.x -= point.x;
    this.y -= point.y;
    this.z -= point.z;
  }


  /**
   * @param {Point3D|Vector3D} point
   * @public
   */
  multiply(point) {
    this.x *= point.x;
    this.y *= point.y;
    this.z *= point.z;
  }


  /**
   * @param {float|int|Number} value
   * @public
   */
  divideByVal(value) {
    this.x /= value;
    this.y /= value;
    this.z /= value;
  }


  /**
   * @param {float|int|Number} value
   * @public
   */
  multiplyByVal(value) {
    this.x *= value;
    this.y *= value;
    this.z *= value;
  }


  /**
   * @public
   */
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }


  /**
   * @param {Point3D|Vector3D} p1
   * @param {Point3D|Vector3D} p2
   * @param {Point3D|Vector3D} p3
   * @public
   */
  setToCenter(p1, p2, p3) {
    const minX = Math.min(p1.x, p2.x, p3.x);
    const minY = Math.min(p1.y, p2.y, p3.y);
    const minZ = Math.min(p1.z, p2.z, p3.z);

    this.x = minX + ((Math.max(p1.x, p2.x, p3.x) - minX) / 2);
    this.y = minY + ((Math.max(p1.y, p2.y, p3.y) - minY) / 2);
    this.z = minZ + ((Math.max(p1.z, p2.z, p3.z) - minZ) / 2);
  }


  /**
   * @param {Point3D} pointA
   * @param {Point3D} pointB
   * @param {int} stepCount
   * @public
   */
  interpolate(pointA, pointB, stepCount) {
    this.x = (pointB.x - pointA.x) / stepCount;
    this.y = (pointB.y - pointA.y) / stepCount;
    this.z = (pointB.z - pointA.z) / stepCount;
  }


  /**
   * @param {float|int|Number} value
   * @public
   */
  addByVal(value) {
    this.x += value;
    this.y += value;
    this.z += value;
  }
}
