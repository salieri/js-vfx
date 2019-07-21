<template>
  <div>
<canvas id='surface' width='480' height='360'></canvas>

      <h2 class='subtitle'>Bilinear Interpolation</h2>
      <p>Pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Bilinear_interpolation'>bilinear interpolation</a>.</p>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { BilinearInterpolatorApp } from './app';

@Component
class BilinearInterpolator extends VueWrapper {
  directions = [
    {
      name: 'q11',
      speed: 0.005,
      direction: -1
    },
    {
      name: 'q12',
      speed: 0.0035,
      direction: 1
    },
    {
      name: 'q21',
      speed: 0.0015,
      direction: 1
    },
    {
      name: 'q22',
      speed: 0.002,
      direction: -1
    }
  ];

  updateDirections() {
    const app = this.app;
    const directions = this.directions;

    if (!app) {
      return;
    }

    for (let i = 0; i < 4; i++) {
      let val = app[directions[i].name];

      val += (directions[i].speed * directions[i].direction);

      if (val < 0) {
        directions[i].direction = 1;
        val = 0;
      }

      if (val > 1) {
        directions[i].direction = -1;
        val = 1;
      }

      app[directions[i].name] = val;
    }
  }


  instantiateApp() {
    return new BilinearInterpolatorApp('surface', 1.0, 0.7, 0.5, 0.3);
  }


  tick() {
    this.updateDirections();

    this.app.draw();
  }
}

export default BilinearInterpolator;
</script>
