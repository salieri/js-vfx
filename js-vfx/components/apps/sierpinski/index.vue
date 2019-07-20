<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='640' height='480'></canvas>

      <h2 class='subtitle'>Sierpiński Triangle</h2>
      <p>A pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle'>Sierpiński
        triangle</a>.</p>

      <b-card sub-title="Options" class="options">
        <b-input-group prepend="Resolution" size="sm" class="mb-3">
          <b-form-input v-model='resolution' type='range' min='1' max='30' @update="updateResolution"/>
        </b-input-group>

        <b-input-group prepend="Zoom" size="sm" class="mb-3">
          <b-form-input v-model='zoom' type='range' min='100' max='5000' @update="updateZoom"/>
        </b-input-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../vue-wrapper';
import { SierpinskiApp } from './app';

@Component
class Sierpinski extends VueWrapper {
  resolution = 15;

  zoom = 100;

  instantiateApp() {
    return new SierpinskiApp('surface', this.zoom / 100, this.resolution);
  }


  tick() {
    this.app.draw();
  }


  updateResolution(val) {
    const app = this.app;

    app.maxIterations = val;

    app.calculatePalette();
    app.draw();
  }


  updateZoom(val) {
    const app = this.app;

    app.zoom = val / 100.0;
    app.draw();
  }
}

export default Sierpinski;
</script>
