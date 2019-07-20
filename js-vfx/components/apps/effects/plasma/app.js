import { App } from '~/lib/core/app';
import { Color } from '~/lib/core/color';
import { NormalizedColor } from '~/lib/core/normalized-color';

export class PlasmaApp extends App {
  constructor(targetCanvasId) {
    super(targetCanvasId);

    this.COLOR_COUNT = 1000;
    this.offset = 0;

    this.calculatePlasma();
    this.calculatePalette();
  }

  draw() {
    this.startDrawing();

    const data = this.virtualSurface.getData();
    const width = this.virtualSurface.getWidth();
    const height = this.virtualSurface.getHeight();

    const ptrMax = width * height * 4;

    let ptr = 0;
    let precalcPtr = 0;

    const precalcTable = this.precalcTable;
    const precalcColors = this.precalcColors;

    const offset = this.offset % this.COLOR_COUNT;
    const colorCount = this.COLOR_COUNT;

    while (ptr < ptrMax) {
      let precalcVal = precalcTable[precalcPtr++] + offset; // Math.round( precalcTable[ precalcPtr++ ] / Plasma.COLOR_COUNT * 255 );

      if (precalcVal >= colorCount) {
        precalcVal -= colorCount;
      }

      const precalcCol = precalcColors[precalcVal];

      data[ptr++] = precalcCol.r;
      data[ptr++] = precalcCol.g;
      data[ptr++] = precalcCol.b;
      ptr++;
    }

    this.offset++;

    this.endDrawing(true);
  };


  calculatePalette() {
    this.precalcColors = new Array(this.COLOR_COUNT);
    const degrees = 180;
    const degreeOffset = 40;

    for (let i = 0; i < this.COLOR_COUNT; i++) {
      const normal = Math.sin(i / this.COLOR_COUNT * Math.PI);
      const hue = (normal * degrees) + degreeOffset;

      const col = new NormalizedColor();

      // NormalizedColor.hsvToRgb( hue, 1.0, 1.0, col );
      NormalizedColor.hsvToRgb(hue, normal, 1 - normal, col);

      const finalColor = new Color();

      col.getColor(finalColor);
      this.precalcColors[i] = finalColor;
    }
  }


  calculatePlasma() {
    const width = this.virtualSurface.getWidth();
    const height = this.virtualSurface.getHeight();

    let ptr = 0;
    let min = false;
    let max = false;

    this.precalcTable = new Array(width * height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const val = (this.COLOR_COUNT / 2) + (this.COLOR_COUNT / 2 - 1) *
          Math.sin(x / 100 * Math.cos(y / 1000) * Math.tan(ptr / 1000000)) *
          Math.cos(y / 100 * Math.sin(x / 100) * Math.tan(ptr / 1000000));

        this.precalcTable[ptr++] = Math.round(val);

        if ((min === false) || (val < min)) {
          min = val;
        }

        if ((max === false) || (val > max)) {
          max = val;
        }
      }
    }
  }
}
