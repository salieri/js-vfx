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


  clear() {
    const maxPtr = this.data.length;

    let ptr = 0;

    while (ptr < maxPtr) {
      this.data[ptr++] = 0;
      this.data[ptr++] = 0;
      this.data[ptr++] = 0;
      this.data[ptr++] = 255;
    }
  }
}

