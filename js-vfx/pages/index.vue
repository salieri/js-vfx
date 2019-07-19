<template>
  <div class="wrapper" :class="{'sidebar-active': sidebarActive}">
    <b-nav pills vertical align="left" class="sidebar">
      <template v-for="(item, key, index) in sidebarItems">
        <h3 v-if="item.type === 'title'" :key="item.id || `sidebar-title-${index}`" class="subtitle" :class="item.classes">{{ item.title }}</h3>
        <b-nav-item v-else :class="item.classes" :key="item.id || `sidebar-nav-item-${index}`" :active="activeItem === item.id" @click=selectApp(item)>{{ item.title }}</b-nav-item>
      </template>

      <div class="toggle-sidebar backdrop" @click="toggleSidebar()"></div>
      <button class="toggle-sidebar" @click="toggleSidebar()">▶</button>
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
import BumpMapping from '~/components/apps/bump-mapping';
import CrepuscularRays from '~/components/apps/crepuscular-rays';
import FisheyeLens from '~/components/apps/fisheye-lens';
import WaveDistortion from '~/components/apps/wave-distortion';

import InterpolatedTriangle from '~/components/apps/interpolated-triangle';
import LineComponent from '~/components/apps/line';

@Component(
  {
    components: {
      // Logo,
    }
  }
)
class IndexPage extends Vue {
  sidebarActive = false;

  activeItem = null;

  curInstance = null;

  sidebarItems = [
    {
      type: 'title',
      title: 'JS-VFX',
      id: 'JsvfxMain',
      classes: 'main'
    },
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
      title: 'Crepuscular Rays',
      component: CrepuscularRays,
      id: 'CrepuscularRays'
    },
    {
      title: 'Fisheye Lens',
      component: FisheyeLens,
      id: 'FisheyeLens'
    },
    {
      title: 'Wave Distortion',
      component: WaveDistortion,
      id: 'WaveDistortion'
    },

    {
      type: 'title',
      title: 'Primitives',
      id: 'PrimitivesTitle'
    },
    {
      title: 'Interpolated Triangle',
      component: InterpolatedTriangle,
      id: 'InterpolatedTriangle'
    },
    {
      title: 'Line',
      component: LineComponent,
      id: 'LineComponent'
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


  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
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
    margin-left: 14rem;
    padding-top: 1rem;
    max-width: 720px;
  }

  .options.card {
    opacity: 0.4;
    margin-top: 3rem;

    transition: all 0.2s;
  }

  .options.card:hover {
    opacity: 1;
  }

  .sidebar {
    height: 100vh;
    background: #5f6363;
    left: 0;
    top: 0;
    position: fixed;
    padding-left: 10px;
    padding-right: 10px;
    width: 14rem;
    border-right: 4px solid #727777;
    z-index: 10000;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);

    .toggle-sidebar {
      display: none;
    }

    a.nav-link {
      color: white;
      padding: 0.25rem 1rem;
    }

    a.nav-link.active {
        background-color: rgba(255, 255, 255, 0.07) !important;
        font-weight: 500;
    }

    .nav-pills .nav-link.active {
      background-color: rgba(255, 255, 255, 0.125);
      border: solid 2px rgba(0, 0, 0, 0.1);
      font-weight: bold;
    }

    li.nav-item {
      text-align: left;
    }

    h3 {
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 0;
      line-height: 125%;
      padding: 0;
      font-size: 200%;

      &.main {
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.8);
        font-size: 260%;
      }
    }
  }
}


@media (max-width: 640px) {
  .wrapper {
    .sidebar {
      width: 1rem;
      transition: all 0.25s;

      h3,
      a.nav-link {
        white-space: nowrap;
      }

      * {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
      }

      button.toggle-sidebar {
        display: block;
        position: absolute;
        opacity: 1;
        right: -1.25rem;
        transition: all 0.3s;
        top: 50%;
        transform: translateY(-50%);
        /* transform: translateY(-20rem); */
        background-color: #3f4242;
        border: 0;
        color: white;
        border-radius: 3px;
        height: 3rem;
        /* border: 3px solid #888e8e; */
        text-align: center;
        /* margin-top: 20rem; */
        /* margin-bottom: 20rem; */
        margin-left: 1rem;
        margin-right: 1rem;
        line-height: 0;
        pointer-events: auto;
      }

      .toggle-sidebar.backdrop {
        transition: background-color 0.3s, left 0.3s, width 0s;
        background: rgba(0, 0, 0, 0);
        opacity: 1;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 2rem;
        height: 100vh;
        margin: 0;
        padding: 0;
        pointer-events: auto;
      }
    }

    .container {
      margin-left: 1rem;
    }

    &.sidebar-active {
      .sidebar {
        width: 14rem;

        * {
          opacity: 1;
          pointer-events: auto;
        }

        button.toggle-sidebar {
          right: -1.66rem;
          transform: translateY(-50%) rotate(180deg);
        }

        .toggle-sidebar.backdrop {
          background: rgba(0, 0, 0, 0.2);
          opacity: 1;
          width: 100vw;
          left: 14rem;
        }
      }
    }
  }
}


</style>
