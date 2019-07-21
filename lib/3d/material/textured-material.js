import { Material } from './material';

export class TexturedMaterial extends Material {
  /**
   * @param {CanvasTexture} [texture]
   * @extends Material
   * @constructor
   */
  constructor(texture) {
    super();

    this.texture = texture;
    this.color = null;
  }
}
