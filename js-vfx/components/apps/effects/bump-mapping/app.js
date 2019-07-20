import { App } from '~/lib/core/app';
import { Vector3D } from '~/lib/core/vector-3d';

export class BumpMappingApp extends App {
  /**
   * @param {string} targetCanvasId
   * @param {CanvasTexture} texture
   * @param {CanvasTexture} heightMapTexture
   * @constructor
   * @extends {app.js}
   */
  constructor(targetCanvasId, texture, heightMapTexture) {
    super(targetCanvasId);

    this.heightMapTexture = heightMapTexture;
    this.texture = texture;

    this.lightPosition = new Vector3D();
    this.drawing = false;
    this.precalculated = false;
    this.precalculatedNormals = [];
    this.embossDepth = 48 / 50;

    this.heightMapTexture.onload = () => {
      this.precalculateNormals();
    };
  }


  /**
   * @param {float} pointHeight Height at X, Y
   * @param {float} pointHeightRight Height at X + 1, Y
   * @param {float} pointHeightAbove Height at X, Y - 1
   * @return {Vector3D} Bump map normal
   * @private
   */
  calculateNormal(pointHeight, pointHeightRight, pointHeightAbove) {
    const phphaDifference = pointHeight - pointHeightAbove;
    const phphrDifference = pointHeight - pointHeightRight;

    const divisor = Math.sqrt(
      (phphaDifference * phphaDifference) +
      (phphrDifference * phphrDifference) +
      this.embossDepth
    );

    /**
     * Note: Have taken out z / divisor here, because it softens the image
     * image too much for my taste.
     */

    return new Vector3D(phphaDifference / divisor, phphrDifference / divisor, this.embossDepth /* / divisor */);
  }


  /**
   * Calculates a normal for each pixel in the height map
   * @private
   */
  precalculateNormals() {
    const width = this.heightMapTexture.getWidth();
    const height = this.heightMapTexture.getHeight();
    const widthMinus = width - 1;
    const pixels = this.heightMapTexture.getPixels();
    const data = pixels.data;

    let abovePtr = 0;
    let ptr = width * 4; // ignore first line
    let singlePtr = width;

    this.precalculatedNormals = new Array(width * height);

    for (let y = 1; y < height; y++) {
      for (let x = 0; x < widthMinus; x++) {
        const bumpNormal = this.calculateNormal(
          data[ptr],
          data[ptr + 4],
          data[abovePtr]
        );

        bumpNormal.normalize();

        this.precalculatedNormals[singlePtr] = bumpNormal;

        abovePtr += 4;
        ptr += 4;

        singlePtr++;
      }

      // Take in account width - 1
      abovePtr += 4;
      ptr += 4;

      singlePtr++;
    }

    this.precalculated = true;
  }


  draw() {
    if (this.isLoaded() !== true) {
      return;
    }

    if (this.hasPrecalculated() !== true) {
      this.precalculateNormals();
    }

    this.startDrawing();

    const width = this.heightMapTexture.getWidth();
    const height = this.heightMapTexture.getHeight();
    const widthMinus = width - 1;

    const texturePixels = this.texture.getPixels();
    const textureData = texturePixels.data;

    const precalc = this.precalculatedNormals;
    const realLightPos = new Vector3D();
    const lightPos = this.lightPosition;
    const lightPosZDiv2 = lightPos.z / 2;

    let ptr = width * 4; // ignore top line
    let singlePtr = width;

    for (let y = 1; y < height; y++) {
      for (let x = 0; x < widthMinus; x++) {
        realLightPos.set(-(lightPos.y - y), (lightPos.x - x), lightPosZDiv2);

        const bumpDot = realLightPos.dot(precalc[singlePtr]);
        const distMul = bumpDot / lightPos.distance(x, y, 0);

        const ptrpp = ptr + 1;
        const ptrp2 = ptr + 2;

        textureData[ptr] = textureData[ptr] * distMul;
        textureData[ptrpp] = textureData[ptrpp] * distMul;
        textureData[ptrp2] = textureData[ptrp2] * distMul;

        ptr += 4;
        singlePtr++;
      }

      // take in account width - 1
      ptr += 4;
      singlePtr++;
    }

    this.canvas.getContext('2d').putImageData(texturePixels, 0, 0);

    this.endDrawing();
  }


  /**
   * @param {float|int} x
   * @param {float|int} y
   * @param {float|int} z
   * @public
   */
  setLightPos(x, y, z) {
    this.lightPosition.x = x;
    this.lightPosition.y = y;
    this.lightPosition.z = z;
  }


  /**
   * @param {float|int} depth
   * @public
   */
  setEmbossDepth(depth) {
    this.embossDepth = depth;

    this.precalculateNormals();
  }


  /**
   * @returns {Boolean}
   * @public
   */
  isLoaded() {
    return ((this.heightMapTexture.loaded === true) && (this.texture.loaded === true));
  }


  /**
   * @returns {Boolean}
   * @private
   */
  hasPrecalculated() {
    return this.precalculated;
  }
}
