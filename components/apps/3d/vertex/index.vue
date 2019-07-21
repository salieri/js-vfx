<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='640' height='480'></canvas>

      <h2 class='subtitle'>Vertex Projection</h2>
      <p>Pure JavaScript (not WebGL) implementation of <a href='http://en.wikipedia.org/wiki/3D_projection'>camera projection.</a></p>

      <b-card sub-title="Options" class="options">
        <b-form-group>
          <b-form-radio-group
            :options="objectOptions"
            v-model="activeObject"
            buttons
            size="sm"
            @change="switchObject"
          >
          </b-form-radio-group>
        </b-form-group>
      </b-card>

    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { VertexApp } from './app';

@Component
class Vertex extends VueWrapper {
  activeObject = 'teapot';

  objectOptions = [
    { text: 'Cube', value: 'cube' },
    { text: 'Sphere', value: 'sphere' },
    { text: 'Torus', value: 'torus' },
    { text: 'Teapot', value: 'teapot' }
  ];

  instantiateApp() {
    return new VertexApp('surface', this.activeObject);
  }


  tick() {
    this.app.rotateMesh();
    this.app.draw();
  }


  switchObject(object) {
    this.app.setObject(object);
  }
}

export default Vertex;
</script>
