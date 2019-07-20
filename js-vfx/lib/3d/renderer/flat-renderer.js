import { Draw } from '../../core';
import { Renderer } from './renderer';

export class FlatRenderer extends Renderer {
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

      Draw.color.r = Math.round(255 / (faceLength - 1) * faceLookup.face.order);
      Draw.color.g = 255 - Math.round(255 / (faceLength - 1) * faceLookup.face.order);

      // faceLookup.face.a

      Draw.triangle(
        faceLookup.mesh.vertices[faceLookup.face.a].cameraProjected,
        faceLookup.mesh.vertices[faceLookup.face.b].cameraProjected,
        faceLookup.mesh.vertices[faceLookup.face.c].cameraProjected,
        faceLookup.face.material.color
      );

      /* Draw.line(
          faceLookup.mesh.vertices[ faceLookup.face.a ].cameraProjected,
          faceLookup.mesh.vertices[ faceLookup.face.b ].cameraProjected,
          faceLookup.face.material.color
        );

      Draw.line(
          faceLookup.mesh.vertices[ faceLookup.face.b ].cameraProjected,
          faceLookup.mesh.vertices[ faceLookup.face.c ].cameraProjected,
          faceLookup.face.material.color
        );

      Draw.line(
          faceLookup.mesh.vertices[ faceLookup.face.c ].cameraProjected,
          faceLookup.mesh.vertices[ faceLookup.face.a ].cameraProjected,
          faceLookup.face.material.color
        ); */

    }
  }
}
