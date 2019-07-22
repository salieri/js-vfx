import { App, Color, Point3D, NormalizedColor, Draw } from '~/lib/core';
import { Scene, MovableCamera, VertexRenderer, TorusFactory, ObjFactory, CuboidFactory, SphereFactory, OmniLight } from '~/lib/3d';


export class VertexApp extends App {
  constructor(targetCanvasId, activeObject = 'torus') {
    super(targetCanvasId);

    this.scene = new Scene();

    this.loadObjects();

    this.initObject(activeObject);
    this.initLights();
    this.initCamera();
    this.initRenderer();
  }


  loadObjects() {
    this.objects = {
      torus: TorusFactory.generate(500, 500, 320, 25, 20),
      teapot: ObjFactory.load('./resources/3d/objects/teapot.obj', this.scene),
      cube: CuboidFactory.generate(500, 500, 500),
      sphere: SphereFactory.generate(600, 600, 600, 25)
    };

    this.objects.torus.position.z = -1200;
    this.objects.teapot.position.z = -1000;
    this.objects.cube.position.z = -1200;
    this.objects.sphere.position.z = -1200;

    this.objects.teapot.scale.set(800, 800, 800);
  }


  initCamera() {
    const camera = new MovableCamera();

    this.scene.addCamera(camera);
  }


  initObject(activeObject) {
    this.setObject(activeObject);
  }


  initRenderer() {
    const renderer = new VertexRenderer();

    this.scene.addRenderer(renderer, true);
  }


  initLights() {
    const light = new OmniLight(new Point3D(-250, 0, -800), new NormalizedColor(1, 1, 1));
    light.diffusePower = 20000;

    const light2 = new OmniLight(new Point3D(0, 0, -1200), new NormalizedColor(1, 1, 1));
    light2.diffusePower = 20000;

    this.scene.addLight(light);
    this.scene.addLight(light2);
  }


  setObject(objectName) {
    this.scene.clearMeshes();

    this.scene.addMesh(this.objects[objectName]);

    this.activeObject = objectName;
  }


  rotateMesh() {
    const rot = new Point3D(0.002, 0.013, 0.004);

    this.objects[this.activeObject].rotation.add(rot);
  }


  draw() {
    this.startDrawing();

    Draw.bgColor = new Color(220, 230, 240);
    Draw.color = new Color(255, 0, 0);

    Draw.clear();

    this.scene.render();

    this.endDrawing(true);
  }
}

