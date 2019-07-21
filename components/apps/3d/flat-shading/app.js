import { VertexApp } from '../vertex/app';
import { FlatShaderRenderer } from '~/lib/3d';

export class FlatShadingApp extends VertexApp {
  initRenderer() {
    const renderer = new FlatShaderRenderer();

    this.scene.addRenderer(renderer, true);
  }
}

