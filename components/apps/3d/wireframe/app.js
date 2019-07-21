import { VertexApp } from '../vertex/app';
import { WireframeRenderer } from '~/lib/3d';

export class WireframeApp extends VertexApp {
  initRenderer() {
    const renderer = new WireframeRenderer();

    this.scene.addRenderer(renderer, true);
  }
}

