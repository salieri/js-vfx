import { App } from '~/lib/core/app';
import { Point2D } from '~/lib/core/point-2d';
import { NormalizedColor } from '~/lib/core/normalized-color';
import { Draw } from '~/lib/core/draw';

export class MetaballsApp extends App {
  balls = [];

  constructor(targetCanvasId, ballCount, minThreshold = 0.001, maxThreshold = 1000) {
    super(targetCanvasId);

    this.thresholdMin = minThreshold;
    this.thresholdMax = maxThreshold;

    this.initBalls(ballCount);
  }


  initBalls(ballCount) {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    for (let i = 0; i < ballCount; i++) {
      const radius = 25 + 25 * Math.random();
      const power = 0.5 + Math.random() * 0.5;

      this.balls.push(
        {
          pos: new Point2D(
            radius + (canvasWidth - radius * 2) * Math.random(),
            radius + (canvasHeight - radius * 2) * Math.random()
          ),
          radius: radius,
          power: power,
          radiusTimesPower: radius * power,
          direction: new Point2D(-1 + Math.random() * 2, -1 + Math.random()),
          tint: new NormalizedColor(0.7 + 0.3 * Math.random(), 0.7 + 0.3 * Math.random(), 0.7 + 0.3 * Math.random())
        }
      );
    }
  }


  moveBalls() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    for (let i = 0; i < this.balls.length; i++) {
      const b = this.balls[i];

      b.pos.add(b.direction);

      if ((b.pos.x < b.radius) && (b.direction.x < 0)) {
        b.direction.x = -b.direction.x;
        b.pos.x = b.radius;
      }

      if ((b.pos.y < b.radius) && (b.direction.y < 0)) {
        b.direction.y = -b.direction.y;
        b.pos.y = b.radius;
      }

      if ((b.pos.x > canvasWidth - b.radius) && (b.direction.x > 0)) {
        b.direction.x = -b.direction.x;
        b.pos.x = canvasWidth - b.radius;
      }

      if ((b.pos.y > canvasHeight - b.radius) && (b.direction.y > 0)) {
        b.direction.y = -b.direction.y;
        b.pos.y = canvasHeight - b.radius;
      }
    }
  }


  draw() {
    this.startDrawing();

    Draw.setSurface(this.virtualSurface);
    Draw.clear();

    const data = this.virtualSurface.getData();
    const width = this.virtualSurface.getWidth();
    const height = this.virtualSurface.getHeight();

    let ptr = 0;

    const balls = this.balls;
    const ballCount = balls.length;
    const thresholdMin = this.thresholdMin;
    const thresholdMax = this.thresholdMax;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let power = 0;
        let colR = 0;
        let colG = 0;
        let colB = 0;

        for (let i = 0; i < ballCount; i++) {
          const b = balls[i];
          const xDiff = x - b.pos.x;
          const yDiff = y - b.pos.y;
          const tint = b.tint;

          if ((xDiff === 0) && (yDiff === 0)) {
            power += b.power;
            colR += tint.r;
            colG += tint.g;
            colB += tint.b;
          } else {
            const d = b.radiusTimesPower / Math.sqrt(xDiff * xDiff + yDiff * yDiff);

            colR += tint.r * d;
            colG += tint.g * d;
            colB += tint.b * d;
            power += d;
          }
        }


        if ((power >= thresholdMin) && (power <= thresholdMax)) {
          // this helps with the fall-off
          if (power < 1.0) {
            const sine = Math.sin(0.5 * Math.PI * power);
            const m = sine * sine * sine;

            colR *= m;
            colG *= m;
            colB *= m;
          }

          colR = Math.round(Math.min(255, Math.max(0, colR * 255)));
          colG = Math.round(Math.min(255, Math.max(0, colG * 255)));
          colB = Math.round(Math.min(255, Math.max(0, colB * 255)));

          data[ptr++] = colR;
          data[ptr++] = colG;
          data[ptr++] = colB;
          ptr++;
        } else {
          ptr += 4;
        }
      }
    }

    this.endDrawing(true);
  }
}

