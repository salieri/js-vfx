import * as _ from 'lodash';

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

    const q11 = this.q11;
    const q21 = this.q21;
    const q12 = this.q12;
    const q22 = this.q22;

    // const normalColor = new NormalizedColor();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const x2MinusX = x2 - x;
        const y2MinusY = y2 - y;
        const xMinusX1 = x - x1;
        const yMinusY1 = y - y1;
        const ltX2MinusX = this.lookupTable[x2MinusX];
        const ltxMinusX1 = this.lookupTable[xMinusX1];

        const hue = Math.round(
          (q11 * ltX2MinusX[y2MinusY] +
          q21 * ltxMinusX1[y2MinusY] +
          q12 * ltX2MinusX[yMinusY1] +
          q22 * ltxMinusX1[yMinusY1]) * 100
        );

        canvasData[ptr++] = this.hueLookupR[hue];
        canvasData[ptr++] = this.hueLookupG[hue];
        canvasData[ptr++] = this.hueLookupB[hue];
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
      return new Float32Array(_.isArray(arguments[0]) ? arguments[0][0] : arguments[0]);
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

    // this.hueLookup = new Array(36001);
    this.hueLookupR = new Uint8Array(36001);
    this.hueLookupG = new Uint8Array(36001);
    this.hueLookupB = new Uint8Array(36001);

    for (let hue = 0; hue <= 36000; hue++) {
      const nc = new NormalizedColor();
      NormalizedColor.hsvToRgb(hue / 100, 1.0, 1.0, nc);

      this.hueLookupR[hue] = Math.round(nc.r * 255);
      this.hueLookupG[hue] = Math.round(nc.g * 255);
      this.hueLookupB[hue] = Math.round(nc.b * 255);
    }
  }
}

