<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='853' height='470'></canvas>

      <h2 class='subtitle'>Wave Distortion</h2>
      <p>Pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Distortion_(optics)'>wave distortion</a>.</p>

      <b-card sub-title="Options" class="options">
        <b-input-group prepend="Amplitude" size="sm" class="mb-3">
          <b-form-input v-model='amplitude' type='range' min='100' max='16000' @update="updateAmplitude" />
        </b-input-group>

        <b-input-group prepend="Frequency" size="sm" class="mb-3">
          <b-form-input v-model='frequency' type='range' min='300' max='100000' @update="updateFrequency" />
        </b-input-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { WaveDistortionApp } from './app';

@Component
class WaveDistortion extends VueWrapper {
  amplitude = 2235;

  frequency = 27712;

  instantiateApp() {
    return new WaveDistortionApp('surface', './resources/apps/wave-distortion/bg.jpg', this.amplitude / 100, this.frequency / 100);
  }


  tick() {
    this.app.phase += 0.1;

    this.app.draw();
  }


  updateAmplitude(val) {
    this.app.amplitude = val / 100;
  }


  updateFrequency(val) {
    this.app.frequency = val / 100;
  }
}

export default WaveDistortion;
</script>
