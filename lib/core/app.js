import { Helper } from './helper';
import { VirtualSurface } from './virtual-surface';
import { Draw } from './draw';

export class App {
  constructor(canvasElementId) {
    this.drawing = false;
    this.paused = false;
    this.startTime = new Date();
    this.collection = {};

    if (canvasElementId) {
      this.canvasId = canvasElementId;
      this.canvas = Helper.getElement(this.canvasId);
      this.canvasContext = this.canvas.getContext('2d');
      this.canvasPixels = this.canvas.getContext('2d').createImageData(this.canvas.width, this.canvas.height);

      this.virtualSurface = new VirtualSurface(this.canvas.width, this.canvas.height, this.canvasPixels.data);
      this.virtualSurface.clear();
    } else {
      this.canvas = null;
      this.canvasId = '';
      this.canvasContext = null;
      this.canvasPixels = null;
      this.virtualSurface = null;
    }
  }

  /**
   * @public
   */
  startDrawing() {
    this.drawing = true;

    Draw.setSurface(this.virtualSurface);

    // Draw.setSurface( this.virtualSurface );
  }

  /**
   * @public
   */
  endDrawing(pushToCanvas) {
    if (pushToCanvas === true) {
      this.canvas.getContext('2d').putImageData(this.canvasPixels, 0, 0);
    }

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
   * @public
   */
  draw() {

  }

  /**
   * @returns {boolean}
   * @public
   */
  isPaused() {
    return this.paused;
  }


  /**
   * @public
   * @param {boolean} isPaused
   */
  setPaused(isPaused) {
    this.paused = isPaused;
  }


  collect(key, val) {
    if (this.collection.hasOwnProperty(key) === false) {
      this.collection[key] = {
        min: val,
        max: val
      };
    }

    const c = this.collection[key];

    if (val < c.min) {
      c.min = val;

      // console.log(key, 'min', val);
    }

    if (val > c.max) {
      c.max = val;

      // console.log(key, 'max', val);
    }
  }
}
