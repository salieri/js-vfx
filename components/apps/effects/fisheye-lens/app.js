import { App } from '~/lib/core/app';
import { CanvasTexture } from '~/lib/core/canvas-texture';
import { EmptyTexture } from '~/lib/core/empty-texture';

export class FisheyeLensApp extends App {
  /**
   * @link http://popscan.blogspot.co.uk/2012/04/fisheye-lens-equation-simple-fisheye.html
   * @param {string} targetCanvasId
   * @param {string} bgImageUrl
   * @constructor
   * @extends {app.js}
   */
  constructor(targetCanvasId, bgImageUrl) {
    super(targetCanvasId);

    this.bgImage = new CanvasTexture(bgImageUrl);
    this.textures = [new EmptyTexture(targetCanvasId), new EmptyTexture(targetCanvasId)];
    this.lenses = [];
  };


  /**
   * Add a new lens
   *
   * <code>
   * var lens = {
   *  x: 0,
   *  y: 0,
   *  radius: 50
   * };
   * </code>
   *
   * @param {object} lens
   * @public
   */
  addLens(lens) {
    this.lenses.push(lens);
  }


  draw() {
    this.drawing = true;
    this.textures[0].data = this.bgImage.context.getImageData(0, 0, this.textures[0].getWidth(),
      this.textures[0].getHeight());

    let curSourceCanvas = 0;
    let curDestCanvas = 1;

    // this is very unoptimized
    for (let i = 0; i < this.lenses.length; i++) {
      this.textures[curDestCanvas].data.data.set(new Uint8ClampedArray(this.textures[curSourceCanvas].data.data));

      this.drawLens(
        Math.round(this.lenses[i].x),
        Math.round(this.lenses[i].y),
        Math.round(this.lenses[i].radius),
        this.textures[curDestCanvas], this.textures[curSourceCanvas]
      );

      curSourceCanvas = 1 - curSourceCanvas;
      curDestCanvas = 1 - curDestCanvas;
    }

    this.canvas.getContext('2d').putImageData(this.textures[curSourceCanvas].data, 0, 0);

    this.drawing = false;
  }


  /**
   * @param {int} posX
   * @param {int} posY
   * @param {int} radius
   * @param {CanvasTexture} destCanvasTexture
   * @param {CanvasTexture} sourceCanvasTexture
   * @private
   */
  drawLens(posX, posY, radius, destCanvasTexture, sourceCanvasTexture) {
    const destData = destCanvasTexture.data.data;
    const sourceData = sourceCanvasTexture.data.data;
    const sourceWidth = sourceCanvasTexture.getWidth();
    const destWidth = destCanvasTexture.getWidth();
    const halfRadius = 0.5 * radius;

    const sqrt = Math.sqrt;
    const cos = Math.cos;
    const atan2 = Math.atan2;
    const round = Math.round;
    const sin = Math.sin;

    for (let y = 0; y < radius; y++) {
      let ptr = (posX + (y + posY) * destWidth) * 4;

      const ny = (y / halfRadius) - 1.0;
      const ny2 = (ny ** 2);

      for (let x = 0; x < radius; x++) {
        const nx = (x / halfRadius) - 1.0;
        const r = sqrt((nx ** 2) + ny2);

        if ((r >= 0.0) && (r <= 1.0)) {
          const theta = atan2(ny, nx);

          const rd = (r + (1 - sqrt(1 - (r ** 2)))) / 2; // rdLookup[round(r * 10000)];

          if (rd <= 1.0) {
            const fnx = rd * cos(theta);
            const fny = rd * sin(theta);
            const px = posX + round((fnx + 1.0) * halfRadius);
            const py = posY + round((fny + 1.0) * halfRadius);

            let bgPtr = (py * sourceWidth + px) * 4;

            destData[ptr++] = sourceData[bgPtr++];
            destData[ptr++] = sourceData[bgPtr++];
            destData[ptr++] = sourceData[bgPtr++];

            ptr++;
          } else {
            ptr += 4;
          }
        } else {
          ptr += 4;
        }
      }
    }
  }
}

