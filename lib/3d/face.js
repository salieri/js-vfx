import { Point3D, Vector3D } from '../core';
import { LightData } from './light';
import { SolidColorMaterial } from './material';

export class Face {
  /**
   * Triad face
   *
   * @param {int} a
   * @param {int} b
   * @param {int} c
   * @param {Material} [material]
   * @param {Point3D} [uvA]
   * @param {Point3D} [uvB]
   * @param {Point3D} [uvC]
   * @constructor
   */
  constructor(a, b, c, material, uvA, uvB, uvC) {
    this.a = a;
    this.b = b;
    this.c = c;

    this.uvA = uvA || new Point3D();
    this.uvB = uvB || new Point3D();
    this.uvC = uvC || new Point3D();

    this.order = 0;
    this.visible = false;

    this.material = material || new SolidColorMaterial();
    this.normal = new Vector3D();
    this.position = new Point3D();
    this.lightData = new LightData();
  }
}
