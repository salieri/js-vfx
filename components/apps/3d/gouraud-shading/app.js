import { VertexApp } from '../vertex/app';
import { GouraudShaderRenderer } from '~/lib/3d';

export class GouraudShadingApp extends VertexApp {
  initRenderer() {
    const renderer = new GouraudShaderRenderer();

    this.scene.addRenderer(renderer, true);
  }
}

