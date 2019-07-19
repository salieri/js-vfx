import Component from 'vue-class-component';
import Vue from 'vue';

@Component()
class VueWrapper extends Vue {
  app = null;

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

        this.tick();
      },
      this.intervalFrequency
    );
  };
}

export default VueWrapper;

