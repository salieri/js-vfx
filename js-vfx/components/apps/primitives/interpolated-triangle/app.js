import { App } from '~/lib/core/app';

import { Point2D } from '~/lib/core/point-2d';
import { Draw } from '~/lib/core/draw';
import { Color } from '~/lib/core/color';
// import { Surface } from '~/lib/core/surface';


export class InterpolatedTriangleApp extends App {
  // eslint-disable-next-line
  constructor(canvasId) {
    super(canvasId);

    // Draw.bgColor.set(220, 220, 220);
  }


  drawTriangle(radAdjustment, posX, posY, triangle) {
    const translatedTriangle = [new Point2D(), new Point2D(), new Point2D()];
    const rad = radAdjustment;

    for (let j = 0; j < 3; j++) {
      translatedTriangle[j].x =
        posX +
        triangle[j].x * Math.cos(rad) - triangle[j].y * Math.sin(rad);

      translatedTriangle[j].y =
        posY +
        triangle[j].y * Math.cos(rad) + triangle[j].x * Math.sin(rad);
    }

    Draw.interpolatedTriangle(
      translatedTriangle[0],
      translatedTriangle[1],
      translatedTriangle[2],
      new Color(255, 255, 255),
      new Color(255, 0, 0),
      new Color(0, 0, 0)
    );
  };


  draw(rad) {
    this.startDrawing();

    Draw.bgColor.set(220, 230, 240);
    Draw.clear();
    // Draw.color.set(32, 255, 32);

    this.drawTriangle(
      // 77.458
      rad
      // 61.758
      // 36.231
      // 9.2
      // 91.503
      //  /*1.108*/, 320, 240,
      , 320, 240, // jshint ignore:line
      [new Point2D(0, -100), new Point2D(-100, 100), new Point2D(100, 100)]
    );

    this.endDrawing(true);
  }
}
