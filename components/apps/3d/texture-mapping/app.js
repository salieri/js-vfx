import { VertexApp } from '../vertex/app';
import { TextureRenderer } from '~/lib/3d';

export class TextureMappingApp extends VertexApp {
  initRenderer() {
    const renderer = new TextureRenderer();

    this.scene.addRenderer(renderer, true);
  }
}

