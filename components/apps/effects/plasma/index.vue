<template>
  <div>
    <canvas id='surface' width='640' height='480'></canvas>

    <h2 class='subtitle'>Plasma Effect</h2>
    <p>Pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Plasma_effect'>plasma effect</a>.</p>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { PlasmaApp } from './app';

@Component
class Plasma extends VueWrapper {
  instantiateApp() {
    return new PlasmaApp('surface');
  }


  tick() {
    this.app.draw();
  }
}

export default Plasma;
</script>
