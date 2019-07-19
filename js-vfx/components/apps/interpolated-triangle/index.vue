<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='640' height='480'></canvas>

      <h2 class='subtitle'>Interpolated Triangle</h2>
      <p>Pure JavaScript implementation of <a href="https://en.wikipedia.org/wiki/Gouraud_shading">triangle polygon interpolation</a> (<i>not</i> <code>canvas.path()</code>)</p>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../vue-wrapper';
import { InterpolatedTriangleApp } from './app';

@Component
class InterpolatedTriangle extends VueWrapper {
  startTime = new Date();

  instantiateApp() {
    return new InterpolatedTriangleApp('surface');
  }


  tick() {
    const curTime = new Date();
    const rad = (curTime.getTime() - this.startTime.getTime()) / 1000;

    this.app.draw(rad);
  }
}

export default InterpolatedTriangle;
</script>
