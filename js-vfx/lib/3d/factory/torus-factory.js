import { Point3D, Color, CanvasTexture } from '../../core';
import { Mesh } from '../mesh';
import { Face } from '../face';
import { Edge } from '../edge';
import { TexturedMaterial } from '../material';

/**
 * This just generates a torus-shaped mesh
 * @namespace
 * @link http://gamedev.stackexchange.com/a/16850
 */
export const TorusFactory = {
  /**
   * @param {float} outerRadiusX
   * @param {float} outerRadiusY
   * @param {float} weight
   * @param {int} outerSteps
   * @param {int} innerSteps
   * @returns {Mesh}
   * @public
   */
  generate: function (outerRadiusX, outerRadiusY, weight, outerSteps, innerSteps) {
    const torus = new Mesh();

    TorusFactory.generateVertices(torus, outerRadiusX, outerRadiusY, weight, outerSteps, innerSteps);
    TorusFactory.generateEdges(torus, outerSteps, innerSteps);
    TorusFactory.generateFaces(torus, outerSteps, innerSteps);

    return torus;
  },


  /**
   * @param {Mesh} torus
   * @param {float} outerRadiusX
   * @param {float} outerRadiusY
   * @param {float} weight
   * @param {int} outerSteps
   * @param {int} innerSteps
   * @private
   */
  generateVertices: function (torus, outerRadiusX, outerRadiusY, weight, outerSteps, innerSteps) {
    const outerResolution = 2 * Math.PI / (outerSteps);
    const innerResolution = 2 * Math.PI / (innerSteps);

    let u = 0;

    for (let ui = 0; ui < outerSteps; ui++) {
      const p = new Point3D(
        outerRadiusX * Math.cos(u),
        outerRadiusY * Math.sin(u),
        0
      );

      const w = new Point3D(p.x, p.y, p.z);
      w.normalize();

      let v = 0;

      for (let vi = 0; vi < innerSteps; vi++) {
        const q = new Point3D(
          outerRadiusX * w.x + weight * Math.cos(v) * w.x + 0,
          outerRadiusY * w.y + weight * Math.cos(v) * w.y + 0,
          outerRadiusX * w.z + weight * Math.cos(v) * w.z + weight * Math.sin(v)
        );

        torus.addVertex(q);

        v += Math.abs(innerResolution);
      }

      u += Math.abs(outerResolution);
    }
  },


  /**
   * @param {Mesh} torus
   * @param {int} outerSteps
   * @param {int} innerSteps
   * @private
   */
  generateEdges: function (torus, outerSteps, innerSteps) {
    const uiCount = outerSteps;
    const viCount = innerSteps;

    for (let ui = 0; ui < uiCount; ui++) {
      for (let vi = 0; vi < viCount; vi++) {
        const thisVertex = ui * viCount + vi;

        let nextUI = ui + 1;

        if (nextUI >= uiCount) {
          nextUI = 0;
        }

        const uiNextVertex = (nextUI * viCount) + vi;

        torus.addEdge(new Edge(thisVertex, uiNextVertex));


        let nextVI = vi + 1;

        if (nextVI >= viCount) {
          nextVI = 0;
        }

        const viNextVertex = (ui * viCount) + nextVI;

        torus.addEdge(new Edge(thisVertex, viNextVertex));
      }
    }
  },


  /**
   * @param {Mesh} torus
   * @param {int} outerSteps
   * @param {int} innerSteps
   * @private
   */
  generateFaces: function (torus, outerSteps, innerSteps) {
    const material = new TexturedMaterial(new CanvasTexture('resources/textures/chrome-4.jpg'));
    material.color = new Color(0, 192, 0);

    const material2 = new TexturedMaterial(new CanvasTexture('resources/textures/chrome-4.jpg'));
    material2.color = new Color(0, 0, 192);


    const uiCount = outerSteps;
    const viCount = innerSteps;

    for (let ui = 0; ui < uiCount; ui++) {
      for (let vi = 0; vi < viCount; vi++) {
        let nextUI = ui + 1;

        if (nextUI >= uiCount) {
          // break;
          nextUI = 0;
        }


        let nextVI = vi + 1;

        if (nextVI >= viCount) {
          // break;
          nextVI = 0;
        }

        torus.addFace(new Face(
          ui * viCount + vi,
          nextUI * viCount + vi,
          nextUI * viCount + nextVI,
          material,
          new Point3D(0, 0, 0),
          new Point3D(0, 1, 0),
          new Point3D(1, 0, 0)
        ));

        torus.addFace(new Face(
          ui * viCount + vi,
          nextUI * viCount + nextVI,
          ui * viCount + nextVI,
          material2,
          new Point3D(0, 1, 0),
          new Point3D(1, 0, 0),
          new Point3D(1, 1, 0)
        ));
      }
    }
  }
};

