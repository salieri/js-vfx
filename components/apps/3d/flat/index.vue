<template>
  <div>
    <canvas id='surface' :width='isMobile() ? 480 : 640' :height='isMobile() ? 360 : 480'></canvas>

    <h2 class='subtitle'>Flat Polygon Projection</h2>
    <p>Pure JavaScript (not WebGL) implementation of non-shaded polygon projection.</p>

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
import { FlatApp } from './app';

@Component
class Flat extends Vertex {
  activeObject = 'torus';

  instantiateApp() {
    return new FlatApp('surface', this.activeObject);
  }
}

export default Flat;
</script>
