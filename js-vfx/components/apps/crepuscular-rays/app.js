import { App } from '~/lib/core/app';
import { CanvasTexture } from '~/lib/core/canvas-texture';
import { Point2D } from '~/lib/core/point-2d';
import { VirtualSurface } from '~/lib/core/virtual-surface';

export class CrepuscularRaysApp extends App {
  constructor(targetCanvasId, backgroundImageUrl, maskImageUrl) {
    super(targetCanvasId);

    this.bgImage = new CanvasTexture(backgroundImageUrl);
    this.maskImage = new CanvasTexture(maskImageUrl);

    this.maskImagePosition = new Point2D(-120, -180);
    this.drawMask = true;
    this.drawBackground = true;
    this.dirtySurface = false;

    this.drawArea = new VirtualSurface(this.canvas.width, this.canvas.height);

    this.totalDrawTime = 0;
    this.totalDrawCount = 0;

    this.lights = [];
  }


  draw() {
    const drawDest = this.dirtySurface ? this.virtualSurface : this.drawArea;

    this.startDrawing();

    if (this.drawBackground === true) {
      this.bgImage.draw(drawDest, 0, 0);
    }

    for (let i = 0; i < this.lights.length; i++) {
      if ((this.lights[i].active === true) && (this.lights[i].drawLight === true)) {
        this.lights[i].image.draw(
          drawDest,
          this.lights[i].position.x - this.lights[i].image.getWidth() / 2,
          this.lights[i].position.y - this.lights[i].image.getHeight() / 2
        );
      }
    }


    if (this.drawMask === true) {
      this.maskImage.draw(drawDest, this.maskImagePosition.x, this.maskImagePosition.y);
    }


    for (let i = 0; i < this.lights.length; i++) {
      if (this.lights[i].active === true) {
        this.processRays(this.lights[i], this.virtualSurface.data, drawDest.data);
      }
    }

    this.endDrawing(true);

    // console.log('pushed');
  };


  /**
   * <code>
   * var lightObject = {
   *   active: true,
   *   position: new Point2D( 0, 0 ),
   *   height: 0.2,
   *   decay: 0.3,
   *   exposur: 1,
   *   density: 0.4,
   *   samples: 10,
   *   imageUr: 'resources/light.png'
   * };
   * </code>
   *
   * @public
   * @param {object|Array} lightObject
   */
  addLight(lightObject) {
    if (lightObject instanceof Array) {
      for (let i = 0; i < lightObject.length; i++) {
        lightObject[i].image = new CanvasTexture(lightObject[i].imageUrl);
        this.lights.push(lightObject[i]);
      }
    } else {
      lightObject.image = new CanvasTexture(lightObject.imageUrl);
      this.lights.push(lightObject);
    }
  };


  processRays(light, dest, source) {
    let dataPtr = 0;

    const width = this.virtualSurface.getWidth();
    const height = this.virtualSurface.getHeight();

    const samples = light.samples;
    const weight = light.weight;
    const decay = light.decay;
    const exposure = light.exposure;

    const lightPosX = light.position.x;
    const lightPosY = light.position.y;

    const normalSamplesByDensity = 1.0 / samples * light.density;
    const maxPtr = width * height * 4;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // curPos.set( x, y );
        // deltaTex.set( curPos );
        // this is faster:
        let curPosX = x;
        let curPosY = y;
        let deltaTexX = x;
        let deltaTexY = y;

        // deltaTex.subtract( light.position );
        // deltaTex.multiplyByVal( normalSamplesByDensity );
        // this is faster:
        deltaTexX -= lightPosX;
        deltaTexY -= lightPosY;
        deltaTexX *= normalSamplesByDensity;
        deltaTexY *= normalSamplesByDensity;


        // this.virtualSurface.getPixel( curPos, initialColor );
        // this is faster:
        let initialR = source[dataPtr];
        let initialG = source[dataPtr + 1];
        let initialB = source[dataPtr + 2];
        let illuminationDecay = 1.0;

        for (let i = 0; i < samples; i++) {
          // curPos.subtract( deltaTex );
          // this is faster:
          curPosX -= deltaTexX;
          curPosY -= deltaTexY;

          // this.virtualSurface.getPixel( curPos, curColor );
          // this is faster:
          let curPtr = (Math.round(curPosX) + Math.round(curPosY) * width) * 4;

          if ((curPtr >= 0) && (curPtr < maxPtr)) {
            let curR = source[curPtr++];
            let curG = source[curPtr++];
            let curB = source[curPtr];

            // curColor.multiplyByVal( illuminationDecay * weight, true );
            // initialColor.add( curColor, true );
            // this is faster:
            const curMul = illuminationDecay * weight;

            curR *= curMul;
            curG *= curMul;
            curB *= curMul;
            initialR += curR;
            initialG += curG;
            initialB += curB;

            illuminationDecay *= decay;
          }
        }

        // this is faster:
        initialR = Math.max(0, Math.min(255, Math.round(initialR * exposure)));
        initialG = Math.max(0, Math.min(255, Math.round(initialG * exposure)));
        initialB = Math.max(0, Math.min(255, Math.round(initialB * exposure)));

        dest[dataPtr++] = initialR;
        dest[dataPtr++] = initialG;
        dest[dataPtr++] = initialB;

        dataPtr++;
      }
    }
  }
}

