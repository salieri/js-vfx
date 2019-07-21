import { Helper } from './helper';
import { Texture } from './texture';
import { VirtualSurface } from './virtual-surface';

export class EmptyTexture extends Texture {
  constructor(canvasElementId) {
    super();

    this.canvas = Helper.getElement(canvasElementId);
    this.context = this.canvas.getContext('2d');

    this.create();

    this.loaded = true;
  };


  getWidth() {
    return this.width;
  };


  getHeight() {
    return this.height;
  };


  getPixels() {
    return this.data;
  };


  create() {
    this.data = this.context.createImageData(this.canvas.width, this.canvas.height);

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.virtualSurface = new VirtualSurface(this.width, this.height, this.data.data);
  };


  destroy() {
    this.loaded = false;
    this.context = null;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.data = null;
  }
}
