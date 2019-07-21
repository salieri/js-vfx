import { App } from '~/lib/core/app';
import { CanvasTexture } from '~/lib/core/canvas-texture';
import { Draw } from '~/lib/core/draw';
import { Point2D } from '~/lib/core/point-2d';
import { Point3D } from '~/lib/core/point-3d';

export class TexturedTriangleApp extends App {
  constructor(targetCanvasId) {
    super(targetCanvasId);

    this.texture = new CanvasTexture('./resources/apps/textured-triangle/smiley2.png');
  }

  drawTriangle(radAdjustment, posX, posY, triangle, uv) {
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

    Draw.texturedTriangle(
      translatedTriangle[0],
      translatedTriangle[1],
      translatedTriangle[2],
      uv[0],
      uv[1],
      uv[2],
      this.texture
    );
  }


  draw(rad) {
    this.startDrawing();

    Draw.bgColor.set(220, 230, 240);
    Draw.color.set(32, 255, 32);

    Draw.clear();

    const s = 1 + (Math.cos(rad) * 0.3); // Math.cos(rad);

    this.drawTriangle(
      rad, 320, 300,
      [new Point2D(s * 100, s * -100), new Point2D(s * 100, s * 100), new Point2D(s * -100, s * 100)],
      [new Point3D(1, 0, 0), new Point3D(1, 1, 0), new Point3D(0, 1, 0)]
    );


    this.drawTriangle(
      rad, 320, 150,
      [new Point2D(s * 100, s * -100), new Point2D(s * 100, s * 100), new Point2D(s * -100, s * 100)],
      [new Point3D(0.25, 0.75, 0), new Point3D(0.5, 0.25, 0), new Point3D(0.75, 0.75, 0)]
      // [ new Point3D( 1, 0, 0 ), new Point3D( 1, 1, 0 ), new Point3D( 0, 1, 0 ) ]
    );

    this.endDrawing(true);
  }
}

