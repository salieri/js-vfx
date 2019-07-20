import { Draw } from '../../core';

import { Renderer } from './renderer';

export class TextureRenderer extends Renderer {
  /**
   * @param {Scene} scene
   */
  draw(scene) {
    scene.faceSortPile.sort();

    const faceLength = scene.faceSortPile.lookupTable.length;

    for (let i = 0; i < faceLength; i++) {
      /**
       * @type {FaceLookup}
       */
      const faceLookup = scene.faceSortPile.lookupTable[i];

      if (faceLookup.face.visible === true) {
        Draw.texturedTriangle(
          faceLookup.mesh.vertices[faceLookup.face.a].cameraProjected,
          faceLookup.mesh.vertices[faceLookup.face.b].cameraProjected,
          faceLookup.mesh.vertices[faceLookup.face.c].cameraProjected,
          faceLookup.face.uvA,
          faceLookup.face.uvB,
          faceLookup.face.uvC,
          faceLookup.face.material.getTexture()
        );
      }
    }
  }
}
