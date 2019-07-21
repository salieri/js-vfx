import { Vector3D, NormalizedColor } from '../../core';
import { Light } from './light';

export class OmniLight extends Light {
  /**
   * @param {Point3D} position
   * @param {NormalizedColor} diffuseColor
   * @link http://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_shading_model
   * @extends Light
   * @constructor
   */
  constructor(position, diffuseColor) {
    super();

    /**
     * @type {Point3D}
     */
    this.position = position;

    /**
     * @type {Color}
     */
    this.diffuseColor = diffuseColor;
    this.diffusePower = 0.5;

    this.specularHardness = 0.5;
    this.specularPower = 0.5;
    this.specularColor = new NormalizedColor(1, 1, 1);
  };


  /**
   * @param {Vector3D} viewerDirection
   * @param {Point3D} normal3DPosition
   * @param {Vector3D} normal
   * @param {LightData} targetLightData
   */

  calculateLightData(viewerDirection, normal3DPosition, normal, targetLightData) {
    if (this.diffusePower > 0) {
      const lightDirection = new Vector3D(this.position);

      lightDirection.subtract(normal3DPosition);

      let distance = lightDirection.length();

      lightDirection.normalize();

      distance = distance * distance;

      const NdotL = normal.dot(lightDirection);

      let intensity = Math.min(Math.max(NdotL, 0.0), 1.0);
      let intensityPowerDistance = intensity * this.diffusePower / distance;

      targetLightData.diffuseColor.r += this.diffuseColor.r * intensityPowerDistance;
      targetLightData.diffuseColor.g += this.diffuseColor.g * intensityPowerDistance;
      targetLightData.diffuseColor.b += this.diffuseColor.b * intensityPowerDistance;

      // var H = ( lightDir + viewDir ).normalize();
      lightDirection.add(viewerDirection);
      lightDirection.normalize();

      const NdotH = normal.dot(lightDirection /* H */);

      intensity = Math.pow(Math.min(Math.max(NdotH, 0.0), 1.0), this.specularHardness);

      intensityPowerDistance = intensity * this.specularPower / distance;

      targetLightData.specularColor.r += this.specularColor.r * intensityPowerDistance;
      targetLightData.specularColor.g += this.specularColor.g * intensityPowerDistance;
      targetLightData.specularColor.b += this.specularColor.b * intensityPowerDistance;
    }
  }
}
