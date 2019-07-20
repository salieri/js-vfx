import { Point3D, Vector3D } from '../../core';
import { Camera } from './camera';

export class MovableCamera extends Camera {
  /**
   * @link http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
   * @constructor
   * @extends Camera
   */
  constructor() {
    super();

    this.position = new Point3D(0, 0, 0);
    this.orientation = new Vector3D(0, 0, 100.0);
    this.viewerPosition = new Point3D(-320, -240, 200.0);
  }


  /**
   * @param {Vertex[]} vertices
   */
  transform(vertices) {
    const camPos = this.position;
    const l = vertices.length;

    const cosX = Math.cos(this.orientation.x);
    const sinX = Math.sin(this.orientation.x);

    const cosY = Math.cos(this.orientation.y);
    const sinY = Math.sin(this.orientation.y);

    const cosZ = Math.cos(this.orientation.z);
    const sinZ = Math.sin(this.orientation.z);

    for (let i = 0; i < l; i++) {
      const vertex = vertices[i];
      const sourcePoint = vertex.transformed;
      const targetPoint = vertex.cameraTransformed;

      const sourceMinusCamX = sourcePoint.x - camPos.x;
      const sourceMinusCamY = sourcePoint.y - camPos.y;
      const sourceMinusCamZ = sourcePoint.z - camPos.z;

      const cosZSourceMinusCamX = cosZ * (sourceMinusCamX);
      const sinZSourceMinusCamX = sinZ * (sourceMinusCamX);

      const cosZSourceMinusCamY = cosZ * (sourceMinusCamY);
      const sinZSourceMinusCamY = sinZ * (sourceMinusCamY);

      const cosYSourceMinusCamZ = cosY * (sourceMinusCamZ);

      const sinYsinZcosZCamYCamX = sinY * (sinZSourceMinusCamY + cosZSourceMinusCamX);


      targetPoint.x = cosZ *
        (
          sinZSourceMinusCamY +
          cosZSourceMinusCamX
        ) -
        (
          sinY * sourceMinusCamZ
        );

      targetPoint.y = sinX *
        (
          cosYSourceMinusCamZ +
          sinYsinZcosZCamYCamX
        ) +
        cosX *
        (
          cosZSourceMinusCamY -
          sinZSourceMinusCamX
        );

      targetPoint.z = cosX *
        (
          cosYSourceMinusCamZ +
          sinYsinZcosZCamYCamX
        ) -
        sinX *
        (
          cosZSourceMinusCamY -
          sinZSourceMinusCamX
        );
    }
  }


  /**
   * @param {Vertex[]} vertices
   */

  project(vertices) {
    const l = vertices.length;
    const viewerPosition = this.viewerPosition;

    for (let i = 0; i < l; i++) {
      const vertex = vertices[i];
      const sourcePoint = vertex.cameraTransformed;
      const targetPoint = vertex.cameraProjected;

      const zDiv = viewerPosition.z / sourcePoint.z;

      targetPoint.x = zDiv * sourcePoint.x - viewerPosition.x;
      targetPoint.y = zDiv * sourcePoint.y - viewerPosition.y;
    }
  }
}
