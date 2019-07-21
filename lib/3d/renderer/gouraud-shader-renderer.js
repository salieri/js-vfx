import { Color, Draw } from '../../core';
import { Renderer } from './renderer';

export class GouraudShaderRenderer extends Renderer {
  /**
   * @param {Scene} scene
   */
  draw(scene) {
    scene.faceSortPile.sort();

    const faceLength = scene.faceSortPile.lookupTable.length;
    const faceColorA = new Color();
    const faceColorB = new Color();
    const faceColorC = new Color();

    for (let i = 0; i < faceLength; i++) {
      /**
       * @type {FaceLookup}
       */
      const faceLookup = scene.faceSortPile.lookupTable[i];

      if (faceLookup.face.visible === true) {
        faceColorA.set(faceLookup.face.material.color);
        faceColorB.set(faceLookup.face.material.color);
        faceColorC.set(faceLookup.face.material.color);

        faceColorA.multiply(faceLookup.mesh.vertices[faceLookup.face.a].lightData.diffuseColor);
        faceColorB.multiply(faceLookup.mesh.vertices[faceLookup.face.b].lightData.diffuseColor);
        faceColorC.multiply(faceLookup.mesh.vertices[faceLookup.face.c].lightData.diffuseColor);

        Draw.interpolatedTriangle(
          faceLookup.mesh.vertices[faceLookup.face.a].cameraProjected,
          faceLookup.mesh.vertices[faceLookup.face.b].cameraProjected,
          faceLookup.mesh.vertices[faceLookup.face.c].cameraProjected,
          faceColorA,
          faceColorB,
          faceColorC
        );
      }
    }
  }
}
