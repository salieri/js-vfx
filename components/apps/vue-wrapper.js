import Component from 'vue-class-component';
import Vue from 'vue';

@Component()
class VueWrapper extends Vue {
  // intentionally not declared here, to keep it from being converted into a reactive object
  // app = null;

  interval = null;

  intervalFrequency = 25;

  startTime = new Date();

  mounted() {
    this.start();
  }

  beforeDestroy() {
    this.stop();
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = null;
    this.app = null;
  }


  instantiateApp() {
    throw new Error('Not implemented');
  }


  tick() {
    throw new Error('Not implemented');
  }

  start() {
    this.stop();

    this.drawTime = 0;
    this.drawCount = 0;
    this.debug = 1;

    this.app = this.instantiateApp();

    if (this.intervalFrequency === 0) {
      return;
    }

    this.interval = setInterval(
      () => {
        const app = this.app;

        if (!app) {
          return;
        }

        if ((app.isDrawing() === true) || (app.isPaused() === true)) {
          return;
        }

        const st = Date.now();

        this.tick();

        const et = Date.now();

        this.drawCount++;
        this.drawTime += (et - st);

        if ((this.debug) && (this.drawCount % 100 === 0)) {
          const avgFrame = this.drawTime / this.drawCount;

          console.log(`Draw average speed: ${Math.round(avgFrame)} ms (${Math.round(1000 / avgFrame, 1)} fps)`);
        }
      },
      this.intervalFrequency
    );
  };


  isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    }

    // Cheeky way to detect iPad
    return navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform);
  }
}

export default VueWrapper;

