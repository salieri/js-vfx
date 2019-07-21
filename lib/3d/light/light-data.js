import { NormalizedColor } from '../../core';

export class LightData {
  /**
   * @constructor
   */
  constructor() {
    this.specularColor = new NormalizedColor(0, 0, 0);
    this.diffuseColor = new NormalizedColor(0, 0, 0);
  }

  reset(ambience) {
    if (!ambience) {
      this.specularColor.set(0, 0, 0, 0);
      this.diffuseColor.set(0, 0, 0);
    } else {
      this.specularColor.set(ambience.light);
      this.diffuseColor.set(ambience.light);
    }
  }
}
