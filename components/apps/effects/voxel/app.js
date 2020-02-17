import _ from 'lodash';

import { App } from '~/lib/core/app';
import { CanvasTexture } from '~/lib/core/canvas-texture';
import { Point3D, Draw } from '~/lib/core';

/**
 * Complete credit goes to
 * @link https://github.com/s-macke/VoxelSpace
 */

export class VoxelProjectionApp extends App {
  /**
   * @constructor
   * @extends {app.js}
   */
  constructor(
    targetCanvasId,
    textureImageUrl,
    heightmapImageUrl,
    zDistanceFar = 800,
    zDistanceNear = 30,
    cameraPosX = 512,
    cameraPosY = 800,
    cameraPosZ = 80,
    cameraAngle = 0,
    scaleHeight = 240,
    horizon = 150,
    sampleFrequencyReduction = 0.2
  ) {
    super(targetCanvasId);

    // texture and heightmap must be same size!
    this.texture = new CanvasTexture(textureImageUrl);
    this.heightmap = new CanvasTexture(heightmapImageUrl);

    this.textureLoaded = false;
    this.heightmapLoaded = false;

    this.zDistanceFar = zDistanceFar;
    this.zDistanceNear = zDistanceNear;
    this.cameraPos = new Point3D(cameraPosX, cameraPosY, cameraPosZ);
    this.cameraAngle = cameraAngle;
    this.scaleHeight = scaleHeight;
    this.horizon = horizon;
    this.sampleFrequencyReduction = sampleFrequencyReduction;

    this.texture.onload = () => {
      this.textureLoaded = true;
    };

    this.heightmap.onload = () => {
      this.heightmapLoaded = true;
    };
  };


  recalculate() {
    const destWidth = this.virtualSurface.width;
    const destHeight = this.virtualSurface.height;
    const heightmapWidth = this.heightmap.getWidth();
    const heightmapHeight = this.heightmap.getHeight();

    this.destYyy = new Uint32Array(_.map(Array(destHeight), (v, i) => (i * destWidth)));
    this.mapYyy = new Uint32Array(_.map(Array(heightmapHeight), (v, i) => (i * heightmapWidth)));
    this.yBuffer = new Uint32Array(Array(destWidth).fill(destHeight));
  }


  draw() {
    if ((!this.textureLoaded) || (!this.heightmapLoaded)) {
      return;
    }

    if (!this.destYyy) {
      this.recalculate();
    }

    this.startDrawing();

    Draw.bgColor.set(220, 230, 240);
    Draw.clear();

    const cameraAngle = this.cameraAngle;
    const zDistanceFar = this.zDistanceFar;
    const scaleHeight = this.scaleHeight;
    const horizon = this.horizon;

    const sinCameraAngle = Math.sin(cameraAngle);
    const cosCameraAngle = Math.cos(cameraAngle);

    const dest = this.virtualSurface.data;
    const destWidth = this.virtualSurface.width;
    const destHeight = this.virtualSurface.height;

    const heightmap = this.heightmap.data;
    const heightmapWidth = this.heightmap.getWidth();
    const heightmapHeight = this.heightmap.getHeight();

    const cameraPosX = Math.round(this.cameraPos.x) % heightmapWidth;
    const cameraPosY = Math.round(this.cameraPos.y) % heightmapHeight;
    const cameraPosZ = this.cameraPos.z;

    const texture = this.texture.data;

    let z = this.zDistanceNear;
    let dz = 1;

    const sampleFrequencyReduction = this.sampleFrequencyReduction;

    const destYyy = this.destYyy;
    const mapYyy = this.mapYyy;
    const yBuffer = this.yBuffer;

    yBuffer.fill(destHeight);

    while (z < zDistanceFar) {
      const sinCameraAngleZ = sinCameraAngle * z;
      const cosCameraAngleZ = cosCameraAngle * z;

      const p1x = -cosCameraAngleZ - sinCameraAngleZ + cameraPosX;
      const p1y = sinCameraAngleZ - cosCameraAngleZ + cameraPosY;
      const p2x = cosCameraAngleZ - sinCameraAngleZ + cameraPosX;
      const p2y = -sinCameraAngleZ - cosCameraAngleZ + cameraPosY;

      const dx = (p2x - p1x) / destWidth;
      const dy = (p2y - p1y) / destWidth;

      const scanlineSize = (destWidth << 2) - 2;

      const zMul = 1 / (z - this.zDistanceNear + 1) * scaleHeight;

      let px = p1x;
      let py = p1y;

      for (let x = 0; x < destWidth; x++) {
        if (px < 0) {
          px += heightmapWidth;
        }

        if (px >= heightmapWidth) {
          px -= heightmapWidth;
        }

        if (py < 0) {
          py += heightmapHeight;
        }

        if (py >= heightmapHeight) {
          py -= heightmapHeight;
        }

        const iPx = Math.round(px);
        const iPy = Math.round(py);

        if ((iPy >= 0) && (iPy < heightmapHeight) && (iPx >= 0) && (iPx < heightmapWidth)) {
          let mapPtr = (iPx + mapYyy[iPy]) << 2;

          const airAboveVoxel = Math.round((cameraPosZ - heightmap[mapPtr]) * zMul + horizon);
          const clippedAirAboveVoxel = yBuffer[x];

          if (airAboveVoxel < clippedAirAboveVoxel) {
            const r = texture[mapPtr++];
            const g = texture[mapPtr++];
            const b = texture[mapPtr];

            let xPtr = (x + (destYyy[airAboveVoxel])) << 2;

            for (let y = airAboveVoxel; y < clippedAirAboveVoxel; y++) {
              dest[xPtr++] = r;
              dest[xPtr++] = g;
              dest[xPtr] = b;

              xPtr += scanlineSize;
            }

            yBuffer[x] = airAboveVoxel;
          }
        }

        px += dx;
        py += dy;
      }

      z += dz;
      dz += sampleFrequencyReduction;
    }

    this.endDrawing(true);
  }
}

