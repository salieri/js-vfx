import { App } from '~/lib/core/app';
import { Draw } from '~/lib/core/draw';
import { Point2D } from '~/lib/core/point-2d';
import { Color } from '~/lib/core/color';
import { NormalizedColor } from '~/lib/core/normalized-color';

export class SierpinskiApp extends App {
  constructor(targetCanvasId, zoom = 1, maxIterations = 15) {
    super(targetCanvasId);

    this.zoom = zoom;
    this.maxIterations = maxIterations;

    this.calculatePalette();
  }


  drawRecursive(sideLength, posCenter, calculatedTriangleHeight, depth) {
    if (sideLength < 0.2) {
      return;
    }

    const sideLengthHalf = sideLength / 2;
    const triangleHeight = calculatedTriangleHeight || Math.sqrt(
      (sideLength * sideLength) - (sideLengthHalf * sideLengthHalf));
    const triangleHalf = triangleHeight / 2;

    if (
      (posCenter.x + sideLengthHalf < 0) ||
      (posCenter.x - sideLengthHalf > this.virtualSurface.getWidth()) ||
      (posCenter.y + sideLengthHalf < 0) ||
      (posCenter.y - sideLengthHalf > this.virtualSurface.getWidth())
    ) {
      return;
    }

    depth = depth || 0;

    const posA = new Point2D(posCenter.x - sideLengthHalf, posCenter.y + triangleHalf);
    const posB = new Point2D(posCenter.x + sideLengthHalf, posCenter.y + triangleHalf);
    const posC = new Point2D(posCenter.x, posCenter.y - triangleHalf);
    const color = new Color(this.precalcColors[depth]);

    color.a = Math.round(0.5 * (this.maxIterations - depth) / this.maxIterations * 255);

    Draw.blendPixel(posA, color);
    Draw.blendPixel(posB, color);
    Draw.blendPixel(posC, color);

    if (depth + 1 < this.maxIterations) {
      const triangleDoubleHalf = triangleHalf / 2;
      const sideDoubleHalf = sideLengthHalf / 2;

      this.drawRecursive(sideLengthHalf, new Point2D(posCenter.x - sideDoubleHalf, posCenter.y + triangleDoubleHalf),
        triangleHalf, depth + 1);
      this.drawRecursive(sideLengthHalf, new Point2D(posCenter.x + sideDoubleHalf, posCenter.y + triangleDoubleHalf),
        triangleHalf, depth + 1);
      this.drawRecursive(sideLengthHalf, new Point2D(posCenter.x, posCenter.y - triangleDoubleHalf), triangleHalf,
        depth + 1);
    }
  };


  draw() {
    this.startDrawing();

    Draw.bgColor.set(220, 230, 240);
    Draw.color.set(32, 255, 32);

    Draw.setSurface(this.virtualSurface);
    Draw.clear();

    const sideLength = Math.min(this.canvas.height, this.canvas.width) * this.zoom;
    const offset = new Point2D(this.zoom * 10, this.zoom * 3);
    const posCenter = new Point2D(this.canvas.width / 2 + offset.x, this.canvas.height / 2 + offset.y);

    this.drawRecursive(sideLength, posCenter);

    this.endDrawing(true);
  };


  calculatePalette() {
    this.precalcColors = new Array(this.maxIterations);

    const degrees = 45;
    const degreeOffset = 0;

    for (let i = 0; i < this.maxIterations; i++) {
      const normal = Math.cos(i / this.maxIterations * Math.PI);
      const hue = (normal * degrees) + degreeOffset;

      const col = new NormalizedColor();

      // NormalizedColor.hsvToRgb( hue, 1.0, 1.0, col );
      NormalizedColor.hsvToRgb(hue, i, 1, col);

      const finalColor = new Color();

      col.getColor(finalColor);
      this.precalcColors[i] = finalColor;
    }
  };
}

