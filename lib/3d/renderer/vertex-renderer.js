import { Renderer } from './renderer';

export class VertexRenderer extends Renderer {
  /**
   * @param {Scene} scene
   */
  draw(scene) {
    for (let m = 0; m < scene.meshes.length; m++) {
      scene.meshes[m].drawVertices();
    }
  }
}
