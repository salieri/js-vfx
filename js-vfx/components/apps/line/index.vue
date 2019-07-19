<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='640' height='480'></canvas>

      <h2 class='subtitle'>Line</h2>
      <p>Pure JavaScript implementation of line (<i>not</i> <code>canvas.lineTo()</code>)</p>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../vue-wrapper';
import { LineApp } from './app';

@Component
class LineComponent extends VueWrapper {
  instantiateApp() {
    return new LineApp('surface');
  }


  tick() {
    const curTime = new Date();
    const rad = (curTime.getTime() - this.startTime.getTime()) / 1000;

    this.app.draw(rad);
  }
}

export default LineComponent;
</script>
