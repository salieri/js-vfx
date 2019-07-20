import { Vector3D, Point2D, Point3D } from '../core';
import { LightData } from './light';

export class Vertex {
  /**
   * @param {Point3D} point
   * @constructor
   */
  constructor(point) {
    this.origin = point;

    this.normal = new Vector3D(0, 0, 0);
    this.transformed = new Point3D(0, 0, 0);
    this.cameraTransformed = new Point3D(0, 0, 0);
    this.cameraProjected = new Point2D(0, 0);

    this.lightData = new LightData();
    this.faces = [];
  }
}

