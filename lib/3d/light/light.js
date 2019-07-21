import { Point3D } from '../../core';

export class Light {
  /**
   * Creates a new light
   * @constructor
   */
  constructor() {
    this.position = new Point3D();
  };

  /**
   * @param {Vector3D} viewerDirection
   * @param {Point3D} normal3DPosition
   * @param {Vector3D} normal
   * @param {LightData} targetLightData
   * @abstract
   */
  calculateLightData(viewerDirection, normal3DPosition, normal, targetLightData) {
    // do nothing
  }
}

