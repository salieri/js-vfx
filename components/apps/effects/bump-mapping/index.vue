<template>
  <div class='row'>
    <div class='col-md-12'>
      <canvas
        id='surface'
        width='320'
        height='200'
        @mousemove="onMouseMove"
        @mouseout="onMouseOut"
        @mouseover="onMouseOver"
      ></canvas>

      <h2 class='subtitle'>Bump Mapping</h2>
      <p>Pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Normal_mapping'>bump mapping</a>
        (normal mapping) on a 2D surface. Move your mouse over the canvas to control the light source.</p>

      <b-card sub-title="Options" class="options">
        <b-input-group prepend="Light Distance" size="sm" class="mb-3">
          <b-form-input v-model='distance' type='range' min='0' max='512' @update="updateDistance" />
        </b-input-group>

        <b-input-group prepend="Emboss Depth" size="sm" class="mb-3">
          <b-form-input v-model='emboss' type='range' min='1' max='1000' @update="updateEmboss" />
        </b-input-group>
      </b-card>
    </div>


  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { BumpMappingApp } from './app';
import { CanvasTexture } from '~/lib/core/canvas-texture';
import { Helper } from '~/lib/core/helper';

@Component
class BumpMapping extends VueWrapper {
  radsPerSecond = 0.8;

  radius = 120;

  lightPosX = 160;

  lightPosY = 100;

  distance = 100;

  emboss = 48;

  instantiateApp() {
    const heightmap = new CanvasTexture('./resources/apps/bump-mapping/mbaco-heightmap2.png');
    const texture = new CanvasTexture('./resources/apps/bump-mapping/mbaco-texture.png');

    const app = new BumpMappingApp('surface', texture, heightmap);

    app.setLightPos(this.lightPosX, this.lightPosY, this.distance);
    // app.setEmbossDepth(this.emboss / 50);

    return app;
  }


  tick() {
    const curTime = new Date();
    const runTime = (curTime.getTime() - this.app.startTime.getTime()) / 1000.00;

    const x = this.lightPosX + this.radius * Math.sin(this.radsPerSecond * runTime);
    const y = this.lightPosY + this.radius * Math.cos(this.radsPerSecond * runTime);
    const z = this.app.lightPosition.z;

    this.app.setLightPos(x, y, z);
    this.app.draw();
  }


  updateDistance(val) {
    const app = this.app;

    app.setLightPos(app.lightPosition.x, app.lightPosition.y, val);
  }


  updateEmboss(val) {
    const app = this.app;

    app.setEmbossDepth(val / 50);
  }


  onMouseMove(event) {
    const coordinates = Helper.getCanvasCoordinates(event, 'surface');

    this.app.setLightPos(coordinates.x, coordinates.y, this.app.lightPosition.z);

    this.app.draw();
  }


  onMouseOver(event) {
    this.app.setPaused(true);
  }


  onMouseOut(event) {
    this.app.setPaused(false);
  }
}

export default BumpMapping;
</script>