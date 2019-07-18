<template>
  <div class="wrapper">
    <b-nav pills vertical align="left" class="sidebar">
      <template v-for="(item, key, index) in sidebarItems">
        <h3 v-if="item.type === 'title'" :key="item.id || `sidebar-title-${index}`">{{ item.title }}</h3>
        <b-nav-item v-else :key="item.id || `sidebar-nav-item-${index}`" :active="activeItem === item.id" @click=selectApp(item)>{{ item.title }}</b-nav-item>
      </template>
    </b-nav>

    <div class="container" ref="appContainer">
    </div>
<!--
      <b-tabs pills card vertical>
        <b-tab title="Bilinear Interpolator" active>
          <bilinear-interpolator />
        </b-tab>
        <b-tab title="Crepuscular Rays">
          Moo
        </b-tab>
      </b-tabs>
-->

      <!--
      <logo />
      <h1 class="title">
        js-vfx
      </h1>
      <h2 class="subtitle">
        Pure JS visual effects implemented on HTML5 canvas
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      -->
  </div>
</template>

<script>
// import * as _ from 'lodash';
import Component from 'vue-class-component';
import Vue from 'vue';

// import Logo from '~/components/Logo.vue';
import BilinearInterpolator from '~/components/apps/bilinear-interpolator';
import WaveDistortion from '~/components/apps/wave-distortion';
import BumpMapping from '~/components/apps/bump-mapping';

@Component(
  {
    components: {
      // Logo,
      BilinearInterpolator,
      BumpMapping,
      WaveDistortion
    }
  }
)
class IndexPage extends Vue {
  activeItem = null;

  curInstance = null;

  sidebarItems = [
    {
      type: 'title',
      title: 'Effects',
      id: 'EffectsTitle'
    },
    {
      title: 'Bilinear Interpolation',
      component: BilinearInterpolator,
      id: 'BilinearInterpolator'
    },
    {
      title: 'Bump Mapping',
      component: BumpMapping,
      id: 'BumpMapping'
    },
    {
      title: 'Wave Distortion',
      component: WaveDistortion,
      id: 'WaveDistortion'
    }
  ];


  destroyCurApp() {
    if (this.curInstance) {
      this.curInstance.$destroy();
      this.curInstance = null;
    }

    const el = this.$refs.appContainer;

    el.childNodes.forEach(c => el.removeChild(c));
  }


  selectApp(item) {
    if (this.activeItem === item.id) {
      return;
    }

    if (this.curInstance) {
      this.destroyCurApp();
    }

    const containerEl = this.$refs.appContainer;
    const el = document.createElement('div');
    const VueComponent = item.component;

    containerEl.appendChild(el);

    this.curInstance = new VueComponent();

    this.curInstance.$mount(el);

    this.activeItem = item.id;
  }
}


export default IndexPage;

</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.wrapper {
  display: flex;

  canvas {
    width: 90%;
    margin-bottom: 20pt;
  }

  .container {
    width: auto;
  }

  .options.card {
    opacity: 0.4;
    margin-top: 3rem;

    transition: all 0.2s;
  }

  .options.card:hover {
    opacity: 1;
  }

  ul.sidebar {
    height: 100vh;
    float: left;
    background: #5f6363;
    left: 0;
    padding-left: 10px;
    padding-right: 10px;
    width: 14rem;
    border-right: 4px solid #727777;

    a.nav-link {
      color: white;
      padding: 0.25rem 1rem;
    }

    .nav-pills .nav-link.active {
      background-color: rgba(255, 255, 255, 0.125);
      border: solid 2px rgba(0, 0, 0, 0.1);
      font-weight: bold;
    }

    li.nav-item {
      text-align: left;
    }
  }
}

</style>
