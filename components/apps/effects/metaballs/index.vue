<template>
  <div>
    <canvas id='surface' width='640' height='480' ref="metaballsCanvas"></canvas>

    <h2 class='subtitle'>Metaballs</h2>
    <p>Pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Metaballs'>Blinn's Metaballs</a>.</p>

    <b-card sub-title="Options" class="options">
      <b-input-group prepend="Min Threshold" size="sm" class="mb-3">
        <b-form-input v-model='minThreshold' type='range' min='1' max='1200' @update="updateMinThreshold" />
      </b-input-group>

      <b-input-group prepend="Max Threshold" size="sm" class="mb-3">
        <b-form-input v-model='maxThreshold' type='range' min='1' max='3100' @update="updateMaxThreshold" />
      </b-input-group>
    </b-card>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { MetaballsApp } from './app';

@Component
class Metaballs extends VueWrapper {
  minThreshold = 1;

  maxThreshold = 3100;


  instantiateApp() {
    // this.intervalFrequency = 10;

    return new MetaballsApp('surface', this.isMobile() ? 4 : 8, this.minThreshold / 1000, (this.maxThreshold === 3100 ? 1000000 : this.maxThreshold) / 1000);
  }


  tick() {
    const app = this.app;

    app.moveBalls();

    app.draw();
  }


  updateMinThreshold(val) {
    this.app.thresholdMin = val / 1000.0;
  }


  updateMaxThreshold(val) {
    if (val >= 3000) {
      val = 1000000;
    }

    this.app.thresholdMax = val / 1000.0;
  }
}

export default Metaballs;
</script>
