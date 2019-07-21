import { FaceLookup } from './face-lookup';

export class FaceSortPile {
  /**
   * @param scene
   * @constructor
   */
  constructor(scene) {
    this.scene = scene;
    this.lookupTable = [];
    this.forceInit = true;
  }


  populate() {
    let idx = 0;
    const meshLength = this.scene.meshes.length;

    for (let i = 0; i < meshLength; i++) {
      const faces = this.scene.meshes[i].faces;
      const faceLength = faces.length;

      for (let j = 0; j < faceLength; j++) {
        this.lookupTable[idx] = new FaceLookup(faces[j], this.scene.meshes[i]);
        idx++;
      }
    }
  }


  resize() {
    let faceCount = 0;
    const meshLength = this.scene.meshes.length;

    for (let i = 0; i < meshLength; i++) {
      faceCount += this.scene.meshes[i].faces.length;
    }

    if (this.lookupTable.length !== faceCount) {
      this.lookupTable = new Array(faceCount);
    }
  }


  reInit() {
    this.forceInit = true;
  }


  init() {
    this.forceInit = false;

    this.resize();
    this.populate();
  }


  sort() {
    if (this.forceInit === true) {
      this.init();
    }

    this.lookupTable.sort(
      function (a, b) {
        if (a.face.position.z > b.face.position.z) {
          return 1;
        }

        if (a.face.position.z < b.face.position.z) {
          return -1;
        }

        return 0;
      }
    );
  }
}

