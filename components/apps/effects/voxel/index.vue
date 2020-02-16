<template>
  <div>
    <canvas id='surface' :width='isMobile() ? 640 : 853' :height='isMobile() ? 350 : 470'></canvas>

    <h2 class='subtitle'>Voxel Projection</h2>
    <p>Pure JavaScript implementation of <a href='https://en.wikipedia.org/wiki/Voxel'>voxel projection</a>.</p>

    <b-card sub-title="Options" class="options">
      <b-input-group prepend="Camera Angle" size="sm" class="mb-3">
        <b-form-input v-model='cameraAngle' type='range' min='-3141' max='3141' @update="updateCameraAngle" />
      </b-input-group>

      <b-input-group prepend="Distance Clip (far)" size="sm" class="mb-3">
        <b-form-input v-model='zDistanceFar' type='range' min='100' max='1000' @update="updateZDistanceFar" />
      </b-input-group>

      <b-input-group prepend="Distance Clip (near)" size="sm" class="mb-3">
        <b-form-input v-model='zDistanceNear' type='range' min='1' max='99' @update="updateZDistanceNear" />
      </b-input-group>

      <b-input-group prepend="Altitude" size="sm" class="mb-3">
        <b-form-input v-model='altitude' type='range' min='0' max='1000' @update="updatePosZ" />
      </b-input-group>

      <b-input-group prepend="Horizon" size="sm" class="mb-3">
        <b-form-input v-model='horizon' type='range' min='0' max='1000' @update="updateHorizon" />
      </b-input-group>

      <b-input-group prepend="Scale Height" size="sm" class="mb-3">
        <b-form-input v-model='scaleHeight' type='range' min='0' max='1000' @update="updateScaleHeight" />
      </b-input-group>

      <b-input-group prepend="Sample Frequency" size="sm" class="mb-3">
        <b-form-input v-model='sampleFrequency' type='range' min='0' max='1500' @update="updateSampleFrequency" />
      </b-input-group>
    </b-card>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { VoxelProjectionApp } from './app';

@Component
class VoxelProjection extends VueWrapper {
  zDistanceFar = 600;

  zDistanceNear = 99;

  altitude = 150;

  horizon = 36;

  scaleHeight = 400;

  sampleFrequency = 0;

  cameraAngle = -92;


  instantiateApp() {
    return new VoxelProjectionApp(
      'surface',
      './resources/apps/voxel/texture.png',
      './resources/apps/voxel/heightmap.png',
      this.zDistanceFar,
      this.zDistanceNear,
      811,
      202,
      this.altitude,
      -this.cameraAngle / 1000,
      this.scaleHeight,
      this.horizon,
      this.sampleFrequency / 1000
    );
  }


  tick() {
    // this.app.phase += 0.1;

    this.app.cameraPos.y -= 1.5;
    this.app.cameraPos.x += 0.5;

    // this.app.cameraAngle -= 0.001;

    this.app.draw();
  }


  updateZDistanceFar(val) {
    console.log('Distance Far', val);
    this.app.zDistanceFar = parseInt(val);
  }


  updateZDistanceNear(val) {
    console.log('Distance NEar', val);
    this.app.zDistanceNear = parseInt(val);
  }


  updatePosZ(val) {
    console.log('Pos Z', val);
    this.app.cameraPos.z = parseInt(val);
  }


  updateHorizon(val) {
    console.log('Horizon', val);
    this.app.horizon = parseInt(val);
  }


  updateScaleHeight(val) {
    console.log('Scale Height', val);
    this.app.scaleHeight = parseInt(val);
  }


  updateSampleFrequency(val) {
    console.log('Sample Frequency', val);
    this.app.sampleFrequencyReduction = parseInt(val) / 1000;
  }


  updateCameraAngle(val) {
    console.log('Camera Angle', val);
    this.app.cameraAngle = -parseInt(val) / 1000;
  }
}

export default VoxelProjection;
</script>
