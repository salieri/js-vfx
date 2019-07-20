import { Point3D, Color, CanvasTexture } from '../../core';
import { Mesh } from '../mesh';
import { Face } from '../face';
import { Edge } from '../edge';
import { TexturedMaterial } from '../material';

/**
 * This just generates a sphere-shaped mesh
 * @link http://stackoverflow.com/a/9787745/844771
 * @namespace
 */
export const SphereFactory = {
  /**
   * @param {float} radiusX
   * @param {float} radiusY
   * @param {float} radiusZ
   * @param {int} steps
   * @returns {Mesh}
   * @public
   */
  generate: function (radiusX, radiusY, radiusZ, steps) {
    const sphere = new Mesh();
    const uSteps = steps;
    const vSteps = steps * 2;

    this.generateVertices(radiusX, radiusY, radiusZ, sphere, uSteps, vSteps);
    this.generateEdges(sphere, uSteps, vSteps);
    this.generateFaces(sphere, uSteps, vSteps);

    return sphere;
  },


  /**
   * @param {int|float|Number} radiusX
   * @param {int|float|Number} radiusY
   * @param {int|float|Number} radiusZ
   * @param {Mesh} sphere
   * @param {int|Number} uSteps
   * @param {int|Number} vSteps
   * @private
   */
  generateVertices: function (radiusX, radiusY, radiusZ, sphere, uSteps, vSteps) {
    const resolution = Math.PI / (uSteps);

    let inclination = 0;

    for (let u = 0; u <= uSteps; u++) {
      let azimuth = 0;

      for (let v = 0; v <= vSteps; v++) {
        const p = new Point3D(
          radiusX * Math.sin(inclination) * Math.cos(azimuth),
          radiusY * Math.sin(inclination) * Math.sin(azimuth),
          radiusZ * Math.cos(inclination)
        );

        sphere.addVertex(p);

        azimuth += Math.abs(resolution);
      }

      inclination += Math.abs(resolution);
    }
  },


  /**
   * @param {Mesh} sphere
   * @param {int|Number} uSteps
   * @param {int|Number} vSteps
   * @private
   */
  generateEdges: function (sphere, uSteps, vSteps) {
    for (let u = 0; u < uSteps; u++) {
      for (let v = 0; v < vSteps; v++) {
        const thisVertex = u * (vSteps + 1) + v;

        let nextUI = u + 1;

        if (nextUI > uSteps) {
          nextUI = 0;
        }

        const uiNextVertex = (nextUI * (vSteps + 1)) + v;

        sphere.addEdge(new Edge(thisVertex, uiNextVertex));


        let nextVI = v + 1;

        if (nextVI > vSteps) {
          nextVI = 0;
        }

        const viNextVertex = (u * (vSteps + 1)) + nextVI;

        sphere.addEdge(new Edge(thisVertex, viNextVertex));
      }
    }
  },


  /**
   * @param {Mesh} sphere
   * @param {int|Number} uSteps
   * @param {int|Number} vSteps
   * @private
   */
  generateFaces: function (sphere, uSteps, vSteps) {
    const material = new TexturedMaterial(new CanvasTexture('./resources/3d/textures/chrome-4.jpg'));
    material.color = new Color(0, 192, 0);

    const material2 = new TexturedMaterial(new CanvasTexture('./resources/3d/textures/chrome-4.jpg'));
    material2.color = new Color(0, 0, 192);


    for (let u = 0; u < uSteps; u++) {
      for (let v = 0; v < vSteps; v++) {
        let nextUI = u + 1;

        if (nextUI > uSteps) {
          // break;
          nextUI = 0;
        }


        let nextVI = v + 1;

        if (nextVI > vSteps) {
          // break;
          nextVI = 0;
        }

        sphere.addFace(new Face(
          u * (vSteps + 1) + v,
          nextUI * (vSteps + 1) + v,
          nextUI * (vSteps + 1) + nextVI,
          material,
          new Point3D(0, 0, 0),
          new Point3D(0, 1, 0),
          new Point3D(1, 0, 0)
        ));

        sphere.addFace(new Face(
          u * (vSteps + 1) + v,
          nextUI * (vSteps + 1) + nextVI,
          u * (vSteps + 1) + nextVI,
          material2,
          new Point3D(0, 1, 0),
          new Point3D(1, 0, 0),
          new Point3D(1, 1, 0)
        ));
      }
    }
  }

};

