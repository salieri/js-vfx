<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='480' height='360'></canvas>

      <h2 class='subtitle'>Title</h2>
      <p>Explanation</p>

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
import { TemplateApp } from './app';

@Component
class TemplateTemplate extends VueWrapper {
  instantiateApp() {
    return new TemplateApp('surface');
  }


  tick() {
  }
}

export default TemplateTemplate;
</script>
