import { FaceSortPile } from './face-sort-pile';
import { Ambience } from './ambience';


export class Scene {
  /**
   * @constructor
   */
  constructor() {
    /**
     * @type Mesh[]
     */
    this.meshes = [];

    /**
     * @type Camera[]
     */
    this.cameras = [];


    /**
     * @type Light[]
     */
    this.lights = [];


    /**
     * @type Material[]
     */
    this.materials = [];


    /**
     * @type Renderer[]
     */
    this.renderers = [];


    /**
     * @type FaceSortPile
     */
    this.faceSortPile = new FaceSortPile(this);


    this.ambience = new Ambience();


    /**
     * @type Camera
     */

    this.activeCamera = null;


    /**
     * @type Renderer
     */
    this.activeRenderer = null;


    this.renderTime = 0;
    this.renderFrameCount = 0;
    this.renderFPS = 0.00;

    this.forceReinitSort = true;
  }


  /**
   * @param {Camera} camera
   * @public
   */
  addCamera(camera) {
    this.cameras.push(camera);

    if (this.activeCamera === null) {
      this.activeCamera = camera;
    }
  }


  /**
   * @param {Renderer} renderer
   * @param {Boolean} [setAsActive]
   * @public
   */
  addRenderer(renderer, setAsActive) {
    this.renderers.push(renderer);

    if ((this.activeRenderer === null) || (setAsActive === true)) {
      this.activeRenderer = renderer;
    }
  }


  /**
   * @param {Mesh} mesh
   * @public
   */
  addMesh(mesh) {
    this.meshes.push(mesh);

    this.forceReinitSort = true;
  }


  /**
   * @param {Light} light
   * @public
   */
  addLight(light) {
    this.lights.push(light);
  }


  /**
   * @param {String} name
   * @returns {int|null}
   * @public
   */
  findMeshIndex(name) {
    for (let i = 0; i < this.meshes.length; i++) {
      if (this.meshes[i].name === name) {
        return i;
      }
    }

    return null;
  }


  /**
   * @param {String} name
   * @public
   */
  removeMesh(name) {
    const i = this.findMeshIndex(name);

    if (i !== null) {
      this.meshes.splice(i, 1);
    }
  }


  /**
   * @param {Renderer} [renderer]
   * @public
   */
  render(renderer) {
    if (!renderer) {
      renderer = this.activeRenderer;
    }

    const renderStart = new Date();


    // transform, project, and calculate normals
    for (let i = 0; i < this.meshes.length; i++) {
      if (this.meshes[i].visible === true) {
        this.meshes[i].transformOrigin();
        this.meshes[i].transformCamera(this.activeCamera);
        this.meshes[i].project(this.activeCamera);

        this.meshes[i].calculateFaceNormals();
        this.meshes[i].calculateVertexNormals();
        this.meshes[i].calculateFaceLightData(this, this.activeCamera);
        this.meshes[i].calculateVertexLightData(this, this.activeCamera);

        this.meshes[i].cull(this.activeCamera);
      }
    }


    this.faceSortPile.sort();


    renderer.draw(this);

    const renderComplete = new Date();

    this.renderFrameCount++;
    this.renderTime += (renderComplete.getTime() - renderStart.getTime()) / 1000.0;
    this.renderFPS = this.renderFrameCount / this.renderTime;
  }


  /**
   * @public
   */
  clearMeshes() {
    this.meshes = [];
    this.faceSortPile.reInit();
  }
}
