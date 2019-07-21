import { Renderer } from './renderer';

export class WireframeRenderer extends Renderer {
  /**
   * @param {Scene} scene
   */
  draw(scene) {
    for (let m = 0; m < scene.meshes.length; m++) {
      scene.meshes[m].drawWireframe();
    }
  }
}
