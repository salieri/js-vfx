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


  draw() {
    if ((!this.textureLoaded) || (!this.heightmapLoaded)) {
      return;
    }

    this.startDrawing();

    Draw.bgColor.set(220, 230, 240);
    Draw.clear();

    const cameraAngle = this.cameraAngle;
    const zDistanceFar = this.zDistanceFar;
    const scaleHeight = this.scaleHeight;
    const horizon = this.horizon;

    const sinPhi = Math.sin(cameraAngle);
    const cosPhi = Math.cos(cameraAngle);

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
    const yBuffer = new Uint32Array(_.fill(Array(destWidth), destHeight));

    let z = this.zDistanceNear;
    let dz = 1;

    const sampleFrequencyReduction = this.sampleFrequencyReduction;

    while (z < zDistanceFar) {
      const sinPhiZ = sinPhi * z;
      const cosPhiZ = cosPhi * z;

      const p1x = -cosPhiZ - sinPhiZ + cameraPosX;
      const p1y = sinPhiZ - cosPhiZ + cameraPosY;
      const p2x = cosPhiZ - sinPhiZ + cameraPosX;
      const p2y = -sinPhiZ - cosPhiZ + cameraPosY;

      const dx = (p2x - p1x) / destWidth;
      const dy = (p2y - p1y) / destWidth;

      const scanlineSize = 4 * destWidth - 3;

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

        if ((px >= 0) && (px < heightmapWidth) && (py >= 0) && (py < heightmapHeight)) {
          let mapPtr = (Math.round(px) + (Math.round(py) * heightmapWidth)) * 4;

          const airAboveVoxel = Math.min(destHeight, Math.max(0,
            Math.round((cameraPosZ - heightmap[mapPtr]) / (z - this.zDistanceNear + 1) * scaleHeight + horizon)
          ));

          const clippedAirAboveVoxel = yBuffer[x];

          // console.log('airAboveVoxel', airAboveVoxel, z, x, px, py);

          const r = texture[mapPtr++];
          const g = texture[mapPtr++];
          const b = texture[mapPtr++];

          if (airAboveVoxel < clippedAirAboveVoxel) {
            let xPtr = (x + (airAboveVoxel * destWidth)) * 4;

            for (let y = airAboveVoxel; y < clippedAirAboveVoxel; y++) {
              dest[xPtr++] = r;
              dest[xPtr++] = g;
              dest[xPtr++] = b;

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

