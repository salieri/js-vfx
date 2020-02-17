<template>
  <div class="wrapper" :class="{'sidebar-active': sidebarActive}">
    <div class="sidebar-wrapper">
      <b-nav pills vertical align="left" class="sidebar">
        <template v-for="(item, key, index) in sidebarItems">
          <h3 v-if="item.type === 'title'" :key="item.id || `sidebar-title-${index}`" class="subtitle" :class="item.classes" @click="(item.component ? menuSelect(item) : null)">{{ item.title }}</h3>
          <b-nav-item v-else :class="item.classes" :key="item.id || `sidebar-nav-item-${index}`" :active="activeItem === item.id" @click="menuSelect(item)">{{ item.title }}</b-nav-item>
        </template>
      </b-nav>

      <div class="toggle-sidebar backdrop" @click="toggleSidebar()"></div>
      <button class="toggle-sidebar" @click="toggleSidebar()">▶</button>
    </div>

    <div class="app-wrapper">
      <div class="app-container" ref="appContainer"></div>
    </div>

    <div class="mobile-navi">
      <b-button @click="prevItem()">&lsaquo;</b-button>
      <b-button @click="nextItem()">&rsaquo;</b-button>
    </div>
  </div>
</template>

<script>
// import * as _ from 'lodash';
import Component from 'vue-class-component';
import Vue from 'vue';
import _ from 'lodash';

import Main from '~/components/main';

// import Logo from '~/components/Logo.vue';
import BilinearInterpolator from '~/components/apps/effects/bilinear-interpolator';
import BumpMapping from '~/components/apps/effects/bump-mapping';
import CrepuscularRays from '~/components/apps/effects/crepuscular-rays';
import FisheyeLens from '~/components/apps/effects/fisheye-lens';
import Metaballs from '~/components/apps/effects/metaballs';
import Plasma from '~/components/apps/effects/plasma';
import VoxelProjection from '~/components/apps/effects/voxel';
import WaveDistortion from '~/components/apps/effects/wave-distortion';

import Flat from '~/components/apps/3d/flat';
import FlatShading from '~/components/apps/3d/flat-shading';
import GouraudShading from '~/components/apps/3d/gouraud-shading';
import TextureMapping from '~/components/apps/3d/texture-mapping';
import Vertex from '~/components/apps/3d/vertex';
import Wireframe from '~/components/apps/3d/wireframe';

import Mandelbrot from '~/components/apps/fractals/mandelbrot';
import Sierpinski from '~/components/apps/fractals/sierpinski';

import InterpolatedTriangle from '~/components/apps/primitives/interpolated-triangle';
import LineComponent from '~/components/apps/primitives/line';
import SolidTriangle from '~/components/apps/primitives/solid-triangle';
import TexturedTriangle from '~/components/apps/primitives/textured-triangle';

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
      component: Main,
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
      title: 'Metaballs',
      component: Metaballs,
      id: 'Metaballs'
    },
    {
      title: 'Plasma',
      component: Plasma,
      id: 'Plasma'
    },
    {
      title: 'Voxel Projection',
      component: VoxelProjection,
      id: 'VoxelProjection'
    },
    {
      title: 'Wave Distortion',
      component: WaveDistortion,
      id: 'WaveDistortion'
    },

    {
      type: 'title',
      title: '3D',
      id: '3DTitle'
    },
    {
      title: 'Flat Polygon',
      component: Flat,
      id: 'FlatPolygon'
    },
    {
      title: 'Flat Shading',
      component: FlatShading,
      id: 'FlatShading'
    },
    {
      title: 'Gouraud Shading',
      component: GouraudShading,
      id: 'GouraudShading'
    },
    {
      title: 'Texture Mapping',
      component: TextureMapping,
      id: 'TextureMapping'
    },
    {
      title: 'Vertex',
      component: Vertex,
      id: 'Vertex'
    },
    {
      title: 'Wireframe',
      component: Wireframe,
      id: 'Wireframe'
    },

    {
      type: 'title',
      title: 'Fractals',
      id: 'FractalsTitle'
    },
    {
      title: 'Mandelbrot Set',
      component: Mandelbrot,
      id: 'Mandelbrot'
    },
    {
      title: 'Sierpiński Triangle',
      component: Sierpinski,
      id: 'Sierpinski'
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
    },
    {
      title: 'Solid Triangle',
      component: SolidTriangle,
      id: 'SolidTriangle'
    },
    {
      title: 'Textured Triangle',
      component: TexturedTriangle,
      id: 'TexturedTriangle'
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


  menuSelect(item) {
    this.selectApp(item);

    if ((window.innerWidth <= 640) && (this.sidebarActive)) {
      this.toggleSidebar();
    }
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

    this.$router.push({ query: { component: item.id } });
  }


  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }


  findApp(appId, defaultApp) {
    return _.find(this.sidebarItems, item => (item.id === appId)) || defaultApp;
  }


  mounted() {
    const app = this.findApp(
      _.get(this, '$router.history.current.query.component'),
      {
        title: 'Main',
        id: 'Main',
        component: Main
      }
    );

    this.selectApp(app);

    this.$router.afterEach(
      (to, from) => {
        const component = _.get(to, 'query.component');

        if (component !== this.activeItem) {
          this.selectApp(this.findApp(component));
        }
      }
    );
  }


  findNext(direction) {
    const itemIndex = this.activeItem ? Math.max(0, _.findIndex(this.sidebarItems, item => (item.id === this.activeItem))) : 0;

    let n = itemIndex;

    do {
      n += direction;

      if (n < 0) {
        n = this.sidebarItems.length - 1;
      }

      if (n >= this.sidebarItems.length) {
        n = 0;
      }

      if (this.sidebarItems[n].component) {
        return this.sidebarItems[n];
      }
    } while (n !== itemIndex);

    return null;
  }


  nextItem() {
    const item = this.findNext(1);

    this.selectApp(item);
  }


  prevItem() {
    const item = this.findNext(-1);

    this.selectApp(item);
  }
}


export default IndexPage;

</script>

<style lang="scss">
$tSpeed: 0.3s;


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
    width: 100%;
    margin-bottom: 20pt;
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.15);
  }

  force-wrapper {
    display: none;
  }

  .app-wrapper {
    position: relative;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    margin-bottom: 2.5rem;

    // left: 17rem;
    // right: 0.5rem;
    max-width: 1050px;
    width: 100%;

    /* margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 14rem;
    padding-top: 1rem;
    max-width: 720px;
    width: 100%; */

    .app-container {
      padding-top: 1.5rem;
      overflow: hidden;
      text-align: center;
      height: auto;
    }
  }

  .options.card {
    opacity: 0.4;
    margin-top: 3rem;

    transition: all 0.2s;
  }

  .options.card:hover {
    opacity: 1;
  }

  .sidebar-wrapper {
    z-index: 1000;
    display: block;
    overflow: visible;

    width: 14rem;
    min-width: 14rem;

    min-height: 100vh;
    // height: fit-content;

    background: #5f6363;
    padding-left: 10px;
    padding-right: 10px;
    border-right: 4px solid #727777;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);

    .toggle-sidebar {
      display: none;
    }

    .sidebar {
      display: block;
      // overflow: scroll;
      height: auto;

      a.nav-link {
        color: white;
        padding: 0.25rem 1rem;

        transition: all 0.1s;
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

      a.nav-link:hover {
        background-color: rgba(255, 255, 255, 0.03);
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
        margin-top: 0.5rem;

        &.main {
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 260%;
          cursor: pointer;
        }
      }
    }
  }

  .mobile-navi {
    display: none;
  }
}


@media (max-width: 1024px) and (min-width: 641px) {
  .wrapper {
    .app-wrapper {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
}

@media (max-width: 640px) {
  .wrapper {
    force-wrapper {
      display: block;
      line-height: 0;
      margin: 0;
      border: 0;
      padding: 0;
    }

    h1.title {
      font-size: 90px;
    }

    .sidebar-wrapper {
      height: 100%;
      min-height: 100%;

      left: 0;
      top: 0;
      position: fixed;
      min-width: initial;

      width: 1rem;
      transition: all $tSpeed;

      .sidebar {
        max-height: 100%;
        overflow: visible auto;
        overscroll-behavior-x: none;
        // display: flex;
        // overflow: initial;

        h3,
        a.nav-link {
          white-space: nowrap;
        }

        * {
          opacity: 0;
          pointer-events: none;
          transition: opacity $tSpeed;
        }
      }

      button.toggle-sidebar {
        display: block;
        position: absolute;
        opacity: 1;
        right: -1.25rem;
        transition: all $tSpeed;
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
        background: rgba(0, 0, 0, 0);
        opacity: 1;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 2rem;
        height: 100%;
        margin: 0;
        padding: 0;
        pointer-events: auto;
        transition: background-color $tSpeed, left $tSpeed, width 0s $tSpeed, backdrop-filter $tSpeed;
      }
    }

    .app-wrapper {
      // position: fixed;
      margin: 0;
      margin-left: 2rem;
      margin-right: 0.5rem;
      margin-bottom: 2.5rem;

      max-height: 100%;
      min-height: 100%;
      // overflow: hidden auto;
      // overscroll-behavior-x: none;

      // left: 2.5rem;
      // right: 1rem;
      overflow: hidden auto;
      overscroll-behavior-x: none;
      // display: flex;
      // min-height: 100%;
      width: initial;

      .app-container {
        margin-top: auto;
        margin-bottom: auto;
      }
    }

    &.sidebar-active {
      .sidebar-wrapper {
        width: 14rem;

        .sidebar {
          * {
            opacity: 1;
            pointer-events: auto;
          }
        }

        button.toggle-sidebar {
          right: -1.66rem;
          transform: translateY(-50%) rotate(180deg);
        }

        .toggle-sidebar.backdrop {
          background: rgba(0, 0, 0, 0.1);
          opacity: 1;
          width: 100vw;
          left: 14rem;
          backdrop-filter: blur(5px) grayscale(0.65);
          transition: background-color $tSpeed, left $tSpeed, width 0s, backdrop-filter $tSpeed;
        }
      }
    }

    .mobile-navi {
      position: fixed;
      right: 0;
      bottom: 0;
      margin: 0.75rem;
      display: block;
      z-index: 100;

      button {
        display: inline-block;
        margin-right: 0.5rem;
        width: 3.5rem;
        font-size: 175%;
        margin-bottom: auto;
        margin-top: auto;
        position: relative;
        background-color: #5f6363;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

html, body, div#__nuxt,  div#__layout, div#__layout > div, div.wrapper {
  // height: auto;
  // min-height: 100%;
  // height: 100%;
}


</style>
