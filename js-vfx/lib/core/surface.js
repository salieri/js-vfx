import { Helper } from './helper';
import { VirtualSurface } from './virtual-surface';

export class Surface {
  /**
   * @param {String} elementID
   * @param {Boolean} createElement
   * @constructor
   */
  constructor(elementID, createElement) {
    this.elementID = elementID;

    if (createElement === true) {
      this.canvas = Helper.createElement('canvas');

      this.canvas.setAttribute('id', elementID);
    } else {
      this.canvas = Helper.getElement(elementID);
    }

    this.context = this.canvas.getContext('2d');

    this.imageData = null;
    this.virtualSurface = null;
    this.drawing = false;
  }


  /**
   * @returns {int}
   * @public
   */
  getWidth() {
    return this.canvas.width;
  }


  /**
   * @returns {int}
   * @public
   */
  getHeight() {
    return this.canvas.height;
  }


  /**
   * @returns {Array}
   * @public
   */
  getData() {
    return this.imageData.data;
  }


  /**
   * @param {int} width
   * @param {int} height
   * @public
   */
  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }


  /**
   * @public
   */
  beginPaint() {
    this.imageData = this.context.createImageData(this.getWidth(), this.getHeight());
    this.virtualSurface = new VirtualSurface(this.getWidth(), this.getHeight(), this.imageData.data);

    this.drawing = true;
  }


  /**
   * @public
   */
  endPaint() {
    this.context.putImageData(this.imageData, 0, 0, 0, 0, this.getWidth(), this.getHeight());

    this.imageData = null;
    this.drawing = false;
  }


  /**
   * @returns {Boolean}
   * @public
   */

  isDrawing() {
    return this.drawing;
  }


  /**
   * @param {Color} bgColor
   * @public
   */
  clear(bgColor) {
    if (this.drawing !== true) {
      return;
    }

    const ptrMax = this.canvas.width * this.canvas.height * 4;
    const data = this.imageData.data;

    const r = bgColor.r;
    const g = bgColor.g;
    const b = bgColor.b;
    const a = bgColor.a;

    let ptr = 0;

    while (ptr < ptrMax) {
      data[ptr++] = r;
      data[ptr++] = g;
      data[ptr++] = b;
      data[ptr++] = a;
    }
  }
}
