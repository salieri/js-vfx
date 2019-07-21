import { NormalizedColor } from '../core';

export class Ambience {
  /**
   * @constructor
   * @param {NormalizedColor} [light]
   */
  constructor(light) {
    this.light = light || new NormalizedColor(0.3, 0.3, 0.3);
  }
}

