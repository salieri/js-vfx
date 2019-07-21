<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas id='surface' width='853' height='470'></canvas>

      <h2 class='subtitle'>Fisheye Lens</h2>
      <p>Pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Distortion_(optics)'>radial barrel distortion</a>.</p>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { FisheyeLensApp } from './app';

import { Helper } from '~/lib/core/helper';

@Component
class FisheyeLens extends VueWrapper {
  lenses = [
    {
      x: 163,
      y: 48,
      radius: 250,
      dirX: -1,
      dirY: 0,
      speedX: -1.6,
      speedY: 0.0
    },
    {
      x: 263,
      y: 98,
      radius: 300,
      dirX: 2.3,
      dirY: 0,
      speedX: 1,
      speedY: 0.0
    }
  ];


  moveLenses() {
    const canvas = Helper.getElement('surface');
    const lenses = this.lenses;

    for (let i = 0; i < lenses.length; i++) {
      lenses[i].x += lenses[i].speedX;
      lenses[i].y += lenses[i].speedY;

      lenses[i].speedY += 0.7;

      if ((lenses[i].x + lenses[i].radius >= canvas.width) && (lenses[i].speedX >= 0)) {
        lenses[i].x = canvas.width - lenses[i].radius;
        lenses[i].speedX = -Math.min(8.0, Math.abs(lenses[i].speedX) * (0.7 + Math.random()));
      }

      if ((lenses[i].x < 0) && (lenses[i].speedX <= 0)) {
        lenses[i].x = 0;
        lenses[i].speedX = Math.min(8.0, Math.abs(lenses[i].speedX) * (0.5 + Math.random()));
      }

      if ((lenses[i].y < 0) && (lenses[i].speedY <= 0)) {
        lenses[i].y = 0;
        lenses[i].speedY = -lenses[i].speedY * 0.9;
      }

      if ((lenses[i].y + lenses[i].radius >= canvas.height) && (lenses[i].speedY >= 0)) {
        lenses[i].y = canvas.height - lenses[i].radius;
        lenses[i].speedY = -lenses[i].speedY * 0.85;

        if (Math.abs(lenses[i].speedY) < 8) {
          lenses[i].speedY *= 2;
        }
      }
    }
  }


  instantiateApp() {
    const app = new FisheyeLensApp('surface', './resources/apps/fisheye-lens/bg.jpg');
    const lenses = this.lenses;

    for (let i = 0; i < lenses.length; i++) {
      app.addLens(lenses[i]);
    }

    return app;
  }


  tick() {
    this.moveLenses();

    this.app.draw();
  }
}

export default FisheyeLens;
</script>
