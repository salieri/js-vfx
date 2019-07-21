import { App } from '~/lib/core/app';
import { Point2D } from '~/lib/core/point-2d';
import { Draw } from '~/lib/core/draw';
import { Color } from '~/lib/core/color';


export class SolidTriangleApp extends App {
  drawTriangles(radAdjustment, posY, triangle) {
    const triCount = 10;
    const translatedTriangle = [new Point2D(), new Point2D(), new Point2D()];

    const pixelColor = new Color(255, 0, 0, 128);

    for (let i = 0; i < triCount; i++) {
      const rad = i * (Math.PI * 2) / triCount + radAdjustment;
      const posX = (Draw.surface.getWidth() / triCount) * (i + 0.5);

      for (let j = 0; j < 3; j++) {
        translatedTriangle[j].x =
          posX +
          triangle[j].x * Math.cos(rad) - triangle[j].y * Math.sin(rad);

        translatedTriangle[j].y =
          posY +
          triangle[j].y * Math.cos(rad) + triangle[j].x * Math.sin(rad);
      }

      Draw.triangle(
        translatedTriangle[0],
        translatedTriangle[1],
        translatedTriangle[2],
        Draw.color
      );


      for (let j = 0; j < 3; j++) {
        Draw.blendPixel(translatedTriangle[j], pixelColor);
      }
    }
  }


  draw(rad) {
    this.startDrawing();

    Draw.color.set(32, 32, 255);
    Draw.bgColor.set(220, 230, 240);

    Draw.clear();

    this.drawTriangles(rad, 150, [new Point2D(0, -10), new Point2D(-10, 10), new Point2D(10, 0)]);
    this.drawTriangles(rad, 200, [new Point2D(0, -8), new Point2D(7, 4), new Point2D(10, 0)]);
    this.drawTriangles(rad, 250, [new Point2D(0, -10), new Point2D(-30, 10), new Point2D(30, 35)]);

    this.endDrawing(true);
  }
}

