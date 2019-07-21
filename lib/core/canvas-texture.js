import { Texture } from './texture';
import { Helper } from './helper';
import { VirtualSurface } from './virtual-surface';

/**
 * @param {string} src URI/URL to texture resource
 * @constructor
 * @extends {Texture}
 */
export class CanvasTexture extends Texture {
  constructor(src) {
    super();

    this.canvas = this.create();
    this.context = this.canvas.getContext('2d');
    this.loaded = false;

    this.image = new Image();
    this.image.crossOrigin = 'Anonymous';
    this.image.src = src;
    this.wasDrawn = false;

    // Let's update stuff once the image has loaded
    this.image.onload = () => {
      this.loaded = true;
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
      this.data = this.getPixels().data;
      this.wasDrawn = false;

      this.virtualSurface = new VirtualSurface(this.image.width, this.image.height, this.data);

      if (typeof this.onload === 'function') {
        this.onload();
      }
    };
  }


  getWidth() {
    return this.image.width;
  };


  getHeight() {
    return this.image.height;
  };


  getPixels() {
    if (this.wasDrawn === false) {
      this.context.drawImage(this.image, 0, 0);
      this.wasDrawn = true;
    }

    return this.context.getImageData(0, 0, this.getWidth(), this.getHeight());
  };


  create() {
    const canvas = Helper.createElement('canvas');

    canvas.width = 1;
    canvas.height = 1;

    return canvas;
  };


  destroy() {
    Helper.removeElement(this.canvas);

    this.loaded = false;
    this.image = null;
    this.context = null;
    this.canvas = null;
  }
}

