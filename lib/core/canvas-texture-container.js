import { CanvasTexture } from './canvas-texture';

export class CanvasTextureContainer {
  constructor() {
    this.textures = {};
  };

  /**
   * Add texture to container
   *
   * @param {string} textureName
   * @param {string} src
   * @public
   */
  add(textureName, src) {
    if (this.exists(textureName) === true) {
      this.remove(textureName);
    }

    const ct = new CanvasTexture(src);
    const me = this;

    this.textures[textureName] = ct;

    ct.onload = function () {
      me.eventImageLoaded(textureName);
    };

    return ct;
  }


  /**
   * Add multiple canvas textures
   *
   * Usage:
   *
   * srcReferenceObject = {
   *   myTexture1 : 'http://www.google.com/logo.png',
   *   myTexture2 : 'http://www.microsoft.com/logo.png',
   *   ...
   * };
   *
   * @param {Object} srcReferenceObject
   * @public
   */
  addMany(srcReferenceObject) {
    for (const textureName in srcReferenceObject) {
      if (srcReferenceObject.hasOwnProperty(textureName)) {
        if (this.textures.hasOwnProperty(textureName)) {
          this.add(textureName, srcReferenceObject[textureName]);
        }
      }
    }
  }

  /**
   * @param {string} textureName
   * @public
   */
  remove(textureName) {
    if (this.textures[textureName] !== null) {
      this.textures[textureName].destroy();
    }

    delete this.textures[textureName];
  }


  /**
   * @param {string} textureName
   * @returns {Boolean}
   * @public
   */
  exists(textureName) {
    return (this.get(textureName) !== null);
  }


  /**
   * @public
   */
  reset() {
    for (const key in this.textures) {
      if (this.textures.hasOwnProperty(key)) {
        this.remove(key);
      }
    }

    this.textures = {};
  }


  /**
   * @param {string} textureName
   * @returns {CanvasTexture|null}
   * @public
   */
  get(textureName) {
    if (this.textures.hasOwnProperty(textureName)) {
      return this.textures[textureName];
    }

    return null;
  }


  /**
   * @returns {Boolean}
   */
  isLoaded() {
    for (const key in this.textures) {
      if (this.textures.hasOwnProperty(key)) {
        if (this.textures[key] !== null) {
          if (this.textures[key].loaded !== true) {
            return false;
          }
        }
      }
    }

    return true;
  }


  /**
   * @public
   * @param {string} textureName
   */
  eventImageLoaded(textureName) {
    if (this.isLoaded() === true) {
      if (typeof this.onload === 'function') {
        this.onload();
      }
    }
  }
}
