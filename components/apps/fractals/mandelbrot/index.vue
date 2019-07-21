<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='640' height='400'></canvas>

      <h2 class='subtitle'>Mandelbrot Set</h2>
      <p>A pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Mandelbrot_set'>Mandelbrot set</a> fractal shape.</p>

      <b-card sub-title="Options" class="options">
        <b-input-group prepend="Resolution" size="sm" class="mb-3">
          <b-form-input v-model='iterations' type='range' min='1' max='100' @update="updateIterations" />
        </b-input-group>

        <b-input-group prepend="Zoom" size="sm" class="mb-3">
          <b-form-input v-model='zoom' type='range' min='100' max='1000' @update="updateZoom" />
        </b-input-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { MandelbrotApp } from './app';

@Component
class Mandelbrot extends VueWrapper {
  iterations = 40;

  zoom = 100;


  instantiateApp() {
    const app = new MandelbrotApp('surface', this.iterations, this.zoom / 100);

    app.calculatePalette();
    app.draw();

    return app;
  }


  tick() {
    // do nothing
  }


  updateIterations(val) {
    this.app.maxIterations = val;

    this.app.calculatePalette();
    this.app.draw();
  }


  updateZoom(val) {
    this.app.zoom = val / 100.0;
    this.app.draw();
  }
}

export default Mandelbrot;
</script>
