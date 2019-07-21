import { Point3D, Color, CanvasTexture, Helper } from '../../core';
import { Mesh } from '../mesh';
import { Face } from '../face';
import { TexturedMaterial } from '../material';

export const ObjFactory = {
  /**
   * Load Wavefront OBJ file
   * @param {String} url
   * @param {Scene} [scene]
   * @returns {Mesh}
   * @link http://en.wikipedia.org/wiki/Wavefront_.obj_file
   */
  load: function (url, scene) {
    const mesh = new Mesh();

    const material = new TexturedMaterial(new CanvasTexture('./resources/3d/textures/chrome-4.jpg'));
    material.color = new Color(0, 192, 0);


    Helper.load(
      url,
      function (data /*, textStatus, jqXHR */) {
        ObjFactory.process(data, mesh, material);

        if (scene) {
          scene.faceSortPile.reInit();
        }
      }
    );

    return mesh;
  },


  /**
   * @param {String} objFileData
   * @param {Mesh} mesh
   * @param {Material} material
   * @private
   */
  process: function (objFileData, mesh, material) {
    const lines = objFileData.split('\n');
    const vertexTextures = [];

    for (let i = 0; i < lines.length; i++) {
      const parameters = ObjFactory.getLineParameters(lines[i].trim());

      if (parameters.length > 0) {
        switch (parameters[0]) {
          case 'v':
            // vertices
            ObjFactory.addVertex(parameters, mesh);
            break;

          case 'f':
            // faces
            ObjFactory.addFace(parameters, mesh, vertexTextures, material);
            break;

          case 'g':
            // mesh name
            mesh.setName(parameters[1]);
            break;

          case 'vt':
            // vertex texture coordinate
            ObjFactory.addVertexTextureCoordinate(parameters, vertexTextures);
            break;

          case 'vn':
            // vertex normals
            // ignored for now
            break;
        }
      }
    }

    mesh.buildWireframe();
  },

  /**
   * @private
   * @param {String} line
   * @returns {Array}
   */
  getLineParameters: function (line) {
    const initialParameters = line.split(' ');
    const parameters = [];

    for (let i = 0; i < initialParameters.length; i++) {
      if (initialParameters[i] !== '') {
        parameters.push(initialParameters[i]);
      }
    }

    return parameters;
  },


  /**
   * @param {String[]} parameters
   * @param {Mesh} mesh
   * @private
   */
  addVertex: function (parameters, mesh) {
    const p = new Point3D(parameters[1], parameters[2], parameters[3]);

    mesh.addVertex(p);
  },


  /**
   * @param {String[]} parameters
   * @param {Mesh} mesh
   * @param {Point3D[]} vertexTextures
   * @param {Material} material
   * @private
   */
  addFace: function (parameters, mesh, vertexTextures, material) {
    const a = ObjFactory.splitFaceParameter(parameters[1]);
    const b = ObjFactory.splitFaceParameter(parameters[2]);
    const c = ObjFactory.splitFaceParameter(parameters[3]);

    let uvA = null;
    let uvB = null;
    let uvC = null;

    if (a.vt !== null) {
      uvA = new Point3D(vertexTextures[a.vt]);
    }

    if (b.vt !== null) {
      uvB = new Point3D(vertexTextures[b.vt]);
    }

    if (c.vt !== null) {
      uvC = new Point3D(vertexTextures[c.vt]);
    }

    const f = new Face(a.v, b.v, c.v, material, uvA, uvB, uvC);

    mesh.addFace(f);
  },


  /**
   * @param {String} parameter
   * @private
   */
  splitFaceParameter: function (parameter) {
    const values = parameter.split('/');

    let vt = null;
    let vn = null;

    const v = parseInt(values[0], 10);

    if (values.length >= 2) {
      vt = parseInt(values[1], 10);
    }

    if (values.length >= 3) {
      vn = parseInt(values[0], 10);
    }


    return {
      v: v - 1,
      vt: vt - 1,
      vn: vn - 1
    };
  },


  /**
   * @param {String[]} parameters
   * @param {Point3D[]} vertexTextures
   * @private
   */
  addVertexTextureCoordinate: function (parameters, vertexTextures) {
    const p = new Point3D(parameters[1], parameters[2], parameters[3]);

    vertexTextures.push(p);
  }


};
