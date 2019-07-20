import { App } from '~/lib/core/app';
import { CanvasTexture } from '~/lib/core/canvas-texture';


export class WaveDistortionApp extends App {
  amplitude = 28.21;

  frequency = 35.62;


  /**
   * @param {string} targetCanvasId
   * @param {string} bgImageUrl
   * @constructor
   * @extends {app.js}
   */
  constructor(targetCanvasId, bgImageUrl, amplitude = 28.21, frequency = 35.62) {
    super(targetCanvasId);

    this.bgImage = new CanvasTexture(bgImageUrl);

    this.phase = 0;
    this.amplitude = amplitude;
    this.frequency = frequency;
  };


  draw() {
    this.startDrawing();

    let x;
    let y;

    const dest = this.virtualSurface.data;
    const destWidth = this.virtualSurface.width;
    const destHeight = this.virtualSurface.height;

    const source = this.bgImage.data;
    const sourceWidth = this.bgImage.getWidth();
    const sourceHeight = this.bgImage.getHeight();

    const periodIncrement = Math.PI / this.frequency;
    const phase = this.phase;
    const amplitude = this.amplitude;
    const displacementY = new Array(destHeight);
    const displacementX = new Array(destWidth);

    let destPtr = 0;
    let period = 0;
    let periodY = period;
    let periodX = period;

    if ((!source) || (!dest)) {
      this.endDrawing(false);
      return;
    }

    for (y = 0; y < destHeight; y++) {
      displacementY[y] = Math.round(amplitude * Math.sin(phase + periodY));
      periodY += periodIncrement;
    }

    for (x = 0; x < destWidth; x++) {
      displacementX[x] = Math.round(amplitude * Math.cos(phase + periodX));
      periodX += periodIncrement;
    }


    for (y = 0; y < destHeight; y++) {
      const dx = displacementY[y];

      for (x = 0; x < destWidth; x++) {
        const dy = displacementX[x];

        const xp = x + dx;
        const yp = y + dy;

        if ((xp >= 0) && (xp < sourceWidth) && (yp >= 0) && (yp < sourceHeight)) {
          let sourcePtr = (yp * sourceWidth + xp) * 4;

          dest[destPtr++] = source[sourcePtr++];
          dest[destPtr++] = source[sourcePtr++];
          dest[destPtr++] = source[sourcePtr++];

          destPtr++;
        } else {
          dest[destPtr++] = 0;
          dest[destPtr++] = 0;
          dest[destPtr++] = 0;
          destPtr++;
        }
      }

      period += periodIncrement;
    }

    this.endDrawing(true);
  }
}

