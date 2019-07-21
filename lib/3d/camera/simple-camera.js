import { Point2D } from '../../core';
import { Camera } from './camera';

export class SimpleCamera extends Camera {
  /**
   * @constructor
   * @extends Camera
   */
  constructor() {
    super();

    this.viewerPosition = new Point2D(320, 240);
    this.perspectiveDepth = 100;
  };

  /**
   * @param {Vertex[]} vertices
   */

  transform(vertices) {
    const l = vertices.length;

    for (let i = 0; i < l; i++) {
      const vertex = vertices[i];
      const sourcePoint = vertex.transformed;
      const targetPoint = vertex.cameraTransformed;

      targetPoint.x = sourcePoint.x;
      targetPoint.y = sourcePoint.y;
      targetPoint.z = sourcePoint.z;
    }
  }


  /**
   * @param {Vertex[]} vertices
   */

  project(vertices) {
    const l = vertices.length;

    for (let i = 0; i < l; i++) {
      const vertex = vertices[i];
      const sourcePoint = vertex.cameraTransformed;
      const targetPoint = vertex.cameraProjected;

      const pd = this.perspectiveDepth / sourcePoint.z;

      targetPoint.x = (sourcePoint.x * pd) + this.viewerPosition.x;
      targetPoint.y = (sourcePoint.y * pd) + this.viewerPosition.y;
    }
  }
}
