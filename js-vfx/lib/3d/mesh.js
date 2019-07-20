import { Helper, Point3D, Draw } from '../core';
import { Vertex } from './vertex';
import { Edge } from './edge';

export class Mesh {
  /**
   * @param [name=]
   * @constructor
   */
  constructor(name) {
    this.name = name || '';
    this.visible = true;

    /**
     * @type Vertex[]
     */
    this.vertices = [];


    /**
     * @type Face[]
     */
    this.faces = [];


    /**
     * @type Edge
     */
    this.edges = [];

    /**
     * @type {Point3D}
     */
    this.position = new Point3D(0, 0, 0);

    /**
     * @type {Point3D}
     */
    this.scale = new Point3D(1.0, 1.0, 1.0);

    /**
     * @type {Point3D}
     */
    this.rotation = new Point3D(0.0, 0.0, 0.0);
  }

  /**
   * @param {Point3D} point
   */

  addVertex(point) {
    this.vertices.push(new Vertex(point));
  }


  /**
   * @param {Edge} edge
   */

  addEdge(edge) {
    this.edges.push(edge);
  }


  /**
   * @param {Face} face
   */

  addFace(face) {
    this.faces.push(face);

    const faceNo = this.faces.length - 1;

    face.order = faceNo;

    this.vertices[face.a].faces.push(faceNo);
    this.vertices[face.b].faces.push(faceNo);
    this.vertices[face.c].faces.push(faceNo);
  }


  /**
   * @link http://en.wikipedia.org/wiki/Rotation_matrix
   */

  rotateMatrix() {
    const cosX = Math.cos(this.rotation.x);
    const sinX = Math.sin(this.rotation.x);
    const cosY = Math.cos(this.rotation.y);
    const sinY = Math.sin(this.rotation.y);
    const cosZ = Math.cos(this.rotation.z);
    const sinZ = Math.sin(this.rotation.z);

    /* I'm not using matrices here simply because testing showed
     * they're about 25% slower than 'do it yourself' method */

    const l = this.vertices.length;

    for (let i = 0; i < l; i++) {
      /**
       * @type Vertex
       */
      const vertex = this.vertices[i];

      const ov = vertex.origin;
      const v = vertex.transformed;

      const x2 = ov.x;
      const y = ov.y;
      const z = ov.z;

      // ROT X
      // const x2 = x;
      const y3 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;

      // ROT Y
      const x3 = x2 * cosY + z2 * sinY;
      // const y3 = y2;
      v.z = x2 * (-sinY) + z2 * cosY;

      // ROT Z
      v.x = x3 * cosZ - y3 * sinZ;
      v.y = x3 * sinZ + y3 * cosZ;
    }
  }


  scaleMatrix() {
    // != on purpose
    if ((this.scale.x !== 1) || (this.scale.y !== 1) || (this.scale.z !== 1)) {
      const l = this.vertices.length;

      for (let i = 0; i < l; i++) {
        this.vertices[i].transformed.multiply(this.scale);
      }
    }
  }


  translate() {
    const l = this.vertices.length;

    for (let i = 0; i < l; i++) {
      this.vertices[i].transformed.add(this.position);
    }
  }


  transformOrigin() {
    this.rotateMatrix();
    this.scaleMatrix();
    this.translate();
  }


  /**
   * @param {Camera} camera
   */
  transformCamera(camera) {
    camera.transform(this.vertices);
  }


  /**
   * @param {Camera} camera
   */
  project(camera) {
    camera.project(this.vertices);
  }


  drawVertices() {
    const l = this.vertices.length;

    for (let i = 0; i < l; i++) {
      Draw.setPixel(this.vertices[i].cameraProjected, Draw.color);
    }
  }


  drawWireframe() {
    const l = this.edges.length;

    for (let i = 0; i < l; i++) {
      Draw.line(this.vertices[this.edges[i].a].cameraProjected, this.vertices[this.edges[i].b].cameraProjected,
        Draw.color);
    }
  }


  drawFlat() {
    const l = this.faces.length;

    for (let i = 0; i < l; i++) {
      Draw.triangle(
        this.vertices[this.faces[i].a].cameraProjected,
        this.vertices[this.faces[i].b].cameraProjected,
        this.vertices[this.faces[i].c].cameraProjected
      );
    }
  }


  calculateFaceNormals() {
    const l = this.faces.length;

    for (let i = 0; i < l; i++) {
      const p1 = this.vertices[this.faces[i].a].cameraTransformed;
      const p2 = this.vertices[this.faces[i].b].cameraTransformed;
      const p3 = this.vertices[this.faces[i].c].cameraTransformed;

      this.faces[i].normal.normal(p1, p2, p3);
      this.faces[i].normal.normalize();

      this.faces[i].position.setToCenter(p1, p2, p3);
    }
  }


  calculateVertexNormals() {
    const l = this.vertices.length;

    for (let i = 0; i < l; i++) {
      const vertexFaces = this.vertices[i].faces;
      const faceLength = vertexFaces.length;
      const normalVertex = this.vertices[i].normal;

      normalVertex.set(0, 0, 0);

      for (let j = 0; j < faceLength; j++) {
        normalVertex.add(this.faces[vertexFaces[j]].normal);
      }

      normalVertex.divideByVal(faceLength);
      normalVertex.normalize();
    }
  }


  /**
   * @param {Scene} scene
   * @param {Camera} camera
   */
  calculateFaceLightData(scene, camera) {
    const lightCount = scene.lights.length;
    const faceCount = this.faces.length;

    for (let j = 0; j < faceCount; j++) {
      const face = this.faces[j];

      face.lightData.reset(scene.ambience);

      for (let i = 0; i < lightCount; i++) {
        scene.lights[i].calculateLightData(camera.orientation, face.position, face.normal, face.lightData);
      }
    }
  }


  /**
   * @param {Scene} scene
   * @param {Camera} camera
   */
  calculateVertexLightData(scene, camera) {
    const lightCount = scene.lights.length;
    const vertexCount = this.vertices.length;

    for (let j = 0; j < vertexCount; j++) {
      const vertex = this.vertices[j];

      vertex.lightData.reset(scene.ambience);

      for (let i = 0; i < lightCount; i++) {
        scene.lights[i].calculateLightData(camera.orientation, vertex.cameraTransformed, vertex.normal,
          vertex.lightData);
      }
    }
  }

  /**
   * @param {Camera} camera
   */
  cull(camera) {
    const faceCount = this.faces.length;

    for (let j = 0; j < faceCount; j++) {
      const face = this.faces[j];

      face.visible = true;
    }
  }


  /**
   * @param {String} name
   */
  setName(name) {
    this.name = name;
  }


  /**
   * Figure out wireframe from face data
   */

  buildWireframe() {
    const vertexLookup = Helper.create2DArray(this.vertices.length, this.vertices.length);

    this.clearEdges();

    for (let i = 0; i < this.faces.length; i++) {
      vertexLookup[Math.min(this.faces[i].a, this.faces[i].b)][Math.max(this.faces[i].a, this.faces[i].b)] = true;
      vertexLookup[Math.min(this.faces[i].a, this.faces[i].c)][Math.max(this.faces[i].a, this.faces[i].c)] = true;
      vertexLookup[Math.min(this.faces[i].b, this.faces[i].c)][Math.max(this.faces[i].b, this.faces[i].c)] = true;
    }

    for (let i = 0; i < vertexLookup.length; i++) {
      for (let j = 0; j < vertexLookup.length; j++) {
        if (vertexLookup[i][j] === true) {
          const edge = new Edge(i, j);
          this.addEdge(edge);
        }
      }
    }
  }


  clearEdges() {
    this.edges = [];
  }
}
