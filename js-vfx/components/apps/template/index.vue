<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='480' height='360'></canvas>

      <h2 class='subtitle'>Title</h2>
      <p>Explanation</p>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../vue-wrapper';
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
