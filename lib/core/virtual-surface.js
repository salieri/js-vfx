import { Color } from './color';

export class VirtualSurface {
  /**
   * @param {int} width
   * @param {int} height
   * @param {Uint8ClampedArray} [data]
   */
  constructor(width, height, data) {
    let doClear = false;

    if (!data) {
      data = new Uint8ClampedArray(width * height * 4);
      doClear = true;
    }

    this.data = data;
    this.width = width;
    this.height = height;

    if (doClear) {
      this.clear();
    }
  };


  /**
   * @returns {int}
   */
  getWidth() {
    return this.width;
  }


  /**
   * @returns {int}
   */
  getHeight() {
    return this.height;
  }


  /**
   * @returns {Uint8ClampedArray}
   * @public
   */
  getData() {
    return this.data;
  }


  /**
   * @param {Point2D} pos
   * @param {Color} destColor
   * @public
   */
  getPixel(pos, destColor) {
    const ptr = (Math.round(pos.x) + Math.round(pos.y) * this.width) * 4;

    destColor.set(
      this.data[ptr],
      this.data[ptr + 1],
      this.data[ptr + 2]
    );
  }


  clear(color) {
    const maxPtr = this.data.length;

    if (!color) {
      color = new Color(0, 0, 0, 255);
    }

    let ptr = 0;

    const r = color.r;
    const b = color.b;
    const g = color.g;
    const a = color.a;


    while (ptr < maxPtr) {
      this.data[ptr++] = r;
      this.data[ptr++] = g;
      this.data[ptr++] = b;
      this.data[ptr++] = a;
    }
  }
}

