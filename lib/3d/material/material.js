export class Material {
  /**
   * @constructor
   */
  constructor() {
    this.color = null;
    this.texture = null;
  };


  /**
   * @returns {null|Color}
   */

  getColor() {
    return this.color;
  }


  /**
   * @returns {null|CanvasTexture}
   */

  getTexture() {
    return this.texture;
  }
}
