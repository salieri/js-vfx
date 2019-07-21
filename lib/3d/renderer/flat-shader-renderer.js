import { Color, Draw } from '../../core';
import { Renderer } from './renderer';

export class FlatShaderRenderer extends Renderer {
  /**
   * @param {Scene} scene
   */
  draw = function (scene) {
    scene.faceSortPile.sort();

    const faceLength = scene.faceSortPile.lookupTable.length;
    const faceColor = new Color();

    for (let i = 0; i < faceLength; i++) {
      /**
       * @type {FaceLookup}
       */
      const faceLookup = scene.faceSortPile.lookupTable[i];

      faceColor.r = Math.round(faceLookup.face.lightData.diffuseColor.r * faceLookup.face.material.color.r);
      faceColor.g = Math.round(faceLookup.face.lightData.diffuseColor.g * faceLookup.face.material.color.g);
      faceColor.b = Math.round(faceLookup.face.lightData.diffuseColor.b * faceLookup.face.material.color.b);

      Draw.triangle(
        faceLookup.mesh.vertices[faceLookup.face.a].cameraProjected,
        faceLookup.mesh.vertices[faceLookup.face.b].cameraProjected,
        faceLookup.mesh.vertices[faceLookup.face.c].cameraProjected,
        faceColor
      );
    }
  }
}
