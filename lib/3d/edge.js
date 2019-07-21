export class Edge {
  /**
   * @param a
   * @param b
   * @constructor
   */
  constructor(a, b) {
    this.a = a;
    this.b = b;
  };


  /**
   * @param {int} a
   * @param {int} b
   * @public
   */
  set(a, b) {
    this.a = a;
    this.b = b;
  }
}
