import { App } from '~/lib/core/app';
import { Color } from '~/lib/core/color';
import { NormalizedColor } from '~/lib/core/normalized-color';

export class MandelbrotApp extends App {
  constructor(targetCanvasId, maxIterations = 40, zoom = 1) {
    super(targetCanvasId);

    this.maxIterations = maxIterations;
    this.zoom = zoom;

    this.calculatePalette();
  }


  draw() {
    this.startDrawing();

    const data = this.virtualSurface.getData();
    const width = this.virtualSurface.getWidth();
    const height = this.virtualSurface.getHeight();

    const maxIterations = this.maxIterations;

    const scaleX = 3.5 / this.zoom;
    const scaleY = 2.0 / this.zoom;

    const yAdder = -this.zoom / 40;
    const xAdder = -this.zoom / 24;

    const precalcColors = this.precalcColors;

    const xPos = (-0.75 + xAdder) - (scaleX / 2);
    const yPos = (0 + yAdder) - (scaleY / 2);

    let ptr = 0;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const x0 = xPos + (px / width) * scaleX;
        const y0 = yPos + (py / height) * scaleY;

        let x = 0.0;
        let y = 0.0;
        let xx = x * x;
        let yy = y * y;
        let iteration = 0;

        while ((xx + yy < 4) && (iteration < maxIterations)) {
          y = 2 * x * y + y0;
          x = xx - yy + x0;

          iteration++;

          xx = x * x;
          yy = y * y;
        }

        const colIndex = Math.max(0, Math.min(maxIterations - 1, iteration));
        const color = precalcColors[colIndex];

        data[ptr++] = color.r;
        data[ptr++] = color.g;
        data[ptr++] = color.b;
        ptr++;
      }
    }

    this.endDrawing(true);
  }


  calculatePalette() {
    this.precalcColors = new Array(this.maxIterations);

    const degrees = 160;
    const degreeOffset = 45;


    for (let i = 0; i < this.maxIterations; i++) {
      const normal = Math.cos(i / this.maxIterations * Math.PI);
      const hue = (normal * degrees) + degreeOffset;

      const col = new NormalizedColor();

      // NormalizedColor.hsvToRgb( hue, 1.0, 1.0, col );
      NormalizedColor.hsvToRgb(hue, normal / 2, normal, col);

      const finalColor = new Color();

      col.getColor(finalColor);
      this.precalcColors[i] = finalColor;
    }
  }
}

