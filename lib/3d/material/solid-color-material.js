import { Color } from '../../core';
import { Material } from './material';

export class SolidColorMaterial extends Material {
  /**
   * @param {Color} [color]
   * @extends Material
   * @constructor
   */
  constructor(color) {
    super();

    this.color = color || new Color(0, 192, 0);
    this.texture = null;
  }
}
