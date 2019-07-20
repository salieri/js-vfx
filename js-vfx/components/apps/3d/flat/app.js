import { VertexApp } from '../vertex/app';
import { FlatRenderer } from '~/lib/3d';

export class FlatApp extends VertexApp {
  initRenderer() {
    const renderer = new FlatRenderer();

    this.scene.addRenderer(renderer, true);
  }
}

