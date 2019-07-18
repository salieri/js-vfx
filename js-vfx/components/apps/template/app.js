import { App } from '~/lib/core/app';

export class TemplateApp extends App {
  constructor(targetCanvasId) {
    super(targetCanvasId);
  };


  draw() {
    this.startDrawing();

    this.endDrawing();
  }
}

