<template>
  <div>
    <canvas id='surface' :width='isMobile() ? 480 : 640' :height='isMobile() ? 360 : 480'></canvas>

    <h2 class='subtitle'>Flat Shading</h2>
    <p>Pure JavaScript (not WebGL) implementation of <a href='https://en.wikipedia.org/wiki/Shading#Flat_shading'>flat shading.</a></p>

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
import { FlatShadingApp } from './app';

@Component
class FlatShading extends Vertex {
  activeObject = 'torus';

  instantiateApp() {
    return new FlatShadingApp('surface', this.activeObject);
  }
}

export default FlatShading;
</script>
