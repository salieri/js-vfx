<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='640' height='480'></canvas>

      <h2 class='subtitle'>Solid Triangle</h2>
      <p>Pure JavaScript implementation of triangle polygon (<i>not</i> <code>canvas.path</code>)</p>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { SolidTriangleApp } from './app';

@Component
class SolidTriangle extends VueWrapper {
  instantiateApp() {
    return new SolidTriangleApp('surface');
  }

  tick() {
    const curTime = new Date();
    const rad = (curTime.getTime() - this.startTime.getTime()) / 1000;

    this.app.draw(rad);
  }
}

export default SolidTriangle;
</script>
