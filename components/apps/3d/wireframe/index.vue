<template>
  <div>
<canvas id='surface' width='640' height='480'></canvas>

      <h2 class='subtitle'>Wireframe Projection</h2>
      <p>Pure JavaScript (not WebGL) implementation of <a href='https://en.wikipedia.org/wiki/Wire-frame_model'>wireframe projection.</a></p>

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
</template>

<script>
import Component from 'vue-class-component';
import Vertex from '../vertex';
import { WireframeApp } from './app';

@Component
class Wireframe extends Vertex {
  activeObject = 'teapot';

  instantiateApp() {
    return new WireframeApp('surface', this.activeObject);
  }
}

export default Wireframe;
</script>
