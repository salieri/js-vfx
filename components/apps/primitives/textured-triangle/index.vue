<template>
  <div>
    <canvas id='surface' width='640' height='480'></canvas>

    <h2 class='subtitle'>Textured Triangle</h2>
    <p>Pure JavaScript implementation of textured triangle polygon (<i>not</i> <code>canvas.path</code>)</p>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { TexturedTriangleApp } from './app';

@Component
class TexturedTriangle extends VueWrapper {
  instantiateApp() {
    return new TexturedTriangleApp('surface');
  }


  tick() {
    const curTime = new Date();
    const rad = (curTime.getTime() - this.startTime.getTime()) / 1000;

    this.app.draw(rad);
  }
}

export default TexturedTriangle;
</script>
