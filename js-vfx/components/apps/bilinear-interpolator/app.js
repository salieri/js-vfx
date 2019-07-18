import { App } from '~/lib/core/app';
import { NormalizedColor } from '~/lib/core/normalized-color';

export class BilinearInterpolatorApp extends App {
  /**
   * @param {string} targetCanvasId
   * @param {number} q11
   * @param {number} q12
   * @param {number} q21
   * @param {number} q22
   * @constructor
   * @extends {app.js}
   */
  constructor(targetCanvasId, q11, q12, q21, q22) {
    super(targetCanvasId);

    this.q11 = q11;
    this.q12 = q12;
    this.q21 = q21;
    this.q22 = q22;

    this.initializeLookupTable();
  };


  draw() {
    this.startDrawing();

    const width = this.canvas.width;
    const height = this.canvas.height;
    const widthMinus = width - 1;
    const heightMinus = height - 1;

    let ptr = 0;

    const canvasPixels = this.canvasPixels;
    const canvasData = canvasPixels.data;

    const x1 = 0;
    const x2 = widthMinus;
    const y1 = 0;
    const y2 = heightMinus;

    const normalColor = new NormalizedColor();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const x2MinusX = x2 - x;
        const y2MinusY = y2 - y;
        const xMinusX1 = x - x1;
        const yMinusY1 = y - y1;

        const hue =
          this.q11 * this.lookupTable[x2MinusX][y2MinusY] +
          this.q21 * this.lookupTable[xMinusX1][y2MinusY] +
          this.q12 * this.lookupTable[x2MinusX][yMinusY1] +
          this.q22 * this.lookupTable[xMinusX1][yMinusY1];

        NormalizedColor.hsvToRgb(hue, 1.0, 1.0, normalColor);

        canvasData[ptr++] = Math.round(normalColor.r * 255);
        canvasData[ptr++] = Math.round(normalColor.g * 255);
        canvasData[ptr++] = Math.round(normalColor.b * 255);
        canvasData[ptr++] = 255;
      }
    }

    this.canvas.getContext('2d').putImageData(canvasPixels, 0, 0);

    this.endDrawing();
  }


  /**
   * @private
   * @returns {Array}
   */
  createMultidimensionalArray() {
    if (arguments.length > 1) {
      const thisDimension = new Array(arguments[0]);
      const slicedArguments = Array.prototype.slice.call(arguments);

      slicedArguments.shift();

      for (let i = 0; i < thisDimension.length; i++) {
        thisDimension[i] = this.createMultidimensionalArray(slicedArguments);
      }

      return thisDimension;
    } else if (arguments.length === 1) {
      return new Array(arguments[0]);
    }

    throw new Error('Failed to create the specified array');
  }


  /**
   * @private
   */
  initializeLookupTable() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const heightMinus = height - 1;
    const widthMinus = width - 1;

    const x1 = 0;
    const x2 = widthMinus;
    const y1 = 0;
    const y2 = heightMinus;

    const oneDivX2MinusX1MulY2MinusY1 = 1 / ((x2 - x1) * (y2 - y1)) * 359.0;

    this.lookupTable = this.createMultidimensionalArray(width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.lookupTable[x2 - x][y2 - y] = (x2 - x) * (y2 - y) * oneDivX2MinusX1MulY2MinusY1;
        this.lookupTable[x - x1][y2 - y] = (x - x1) * (y2 - y) * oneDivX2MinusX1MulY2MinusY1;
        this.lookupTable[x2 - x][y - y1] = (x2 - x) * (y - y1) * oneDivX2MinusX1MulY2MinusY1;
        this.lookupTable[x - x1][y - y1] = (x - x1) * (y - y1) * oneDivX2MinusX1MulY2MinusY1;
      }
    }
  }
}

