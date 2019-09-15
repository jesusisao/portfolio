<template>
  <div class="wrapper" ref="canvasWrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";
import * as THREE from "three";
const OrbitControls = require('three-orbitcontrols')

const isElement = (x: any): x is Element => x instanceof Element;

@Component({
  computed: {
    ...mapGetters({
      shouldProcessBeTerminated: "particle/shouldProcessBeTerminated",
      isRunning: "particle/isRunning",
      shouldBeStopped: "particle/shouldBeStopped"
    })
  },
  methods: {
    ...mapMutations({
      addRunningIds: "particle/addRunningIds",
      moveRunningIdsToTerminateIds: "particle/moveRunningIdsToTerminateIds",
      start: "particle/start",
      stop: "particle/stop"
    })
  }
})
export default class ParticleCanvas extends Vue {
  public isRunning: any;
  public shouldBeStopped: any;
  public shouldProcessBeTerminated: any;
  public addRunningIds: any;
  public moveRunningIdsToTerminateIds: any;
  public start: any;
  public stop: any;

  mounted() {
    this.writeCanvas(false);
  }

  startCanvas() {
    this.start();
    this.writeCanvas(false);
  }

  regenerateCanvas() {
    this.writeCanvas(true);
  }

  writeCanvas(doRegenerateDots: boolean) {
    const { canvasWrapper } = this.$refs;
    if (!isElement(canvasWrapper)) return;
    const canvasWidth: number = canvasWrapper.clientWidth;
    const canvasHeight: number = canvasWrapper.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas: <HTMLCanvasElement>document.getElementById("canvas")
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, canvasHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight);
    camera.position.set(0, 0, 1000);
    const controls = new OrbitControls(camera);
    controls.autoRotate = false;

    // 形状データを作成
    const geometry = new THREE.Geometry();
    // 配置する範囲
    const SIZE = 3000;
    // 配置する個数
    const LENGTH = 3000;
    for (let i = 0; i < LENGTH; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          SIZE * (Math.random() - 0.5),
          SIZE * (Math.random() - 0.5),
          SIZE * (Math.random() - 0.5)
        )
      );
    }
    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      // 一つ一つのサイズ
      size: 20,
      map: this.createCanvasMaterial(255, 246, 201, 256, 1, 0.3),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    // const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
    // scene.add(light);

    scene.fog = new THREE.Fog(0x313131, 50, 2000);
    scene.background = new THREE.Color( 0x313131 );

    // start animation
    this.moveRunningIdsToTerminateIds();
    const pid = new Date().getTime();
    this.addRunningIds(pid);
    this.updateCanvas(this, renderer, canvasWidth, canvasHeight, pid)(
      scene,
      camera,
      controls
    );
  }

  private updateCanvas = (
    self: any,
    renderer: THREE.WebGLRenderer,
    canvasWidth: number,
    canvasHeight: number,
    pid: number
  ) => (scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: any) => {
    // thisへはアクセスできないので注意
    if (self.shouldProcessBeTerminated(pid)) return;
    const recursion = () =>
      self.updateCanvas(self, renderer, canvasWidth, canvasHeight, pid)(
        scene,
        camera,
        controls
      );

    // main animation processing

    controls.update();
    renderer.render(scene, camera);

    if (!self.shouldBeStopped) {
      requestAnimationFrame(recursion);
    }
  };

  stopCanvas() {
    this.stop();
    this.moveRunningIdsToTerminateIds();
  }

  createCanvasMaterial(colorR: number, colorG: number, colorB: number, size: number, alpha: number, blur: number) {
    const matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    const matContext = matCanvas.getContext('2d')!;
    // create exture object from canvas.
    const texture = new THREE.Texture(matCanvas);
    // Draw a circle
    const center = size / 2;
    matContext.globalAlpha = alpha;
    const blurDistance = 1 - blur

    const radgrad = matContext.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      center
    );
    radgrad.addColorStop(0, `rgba(${colorR}, ${colorG}, ${colorB}, 1)`);
    radgrad.addColorStop(blurDistance, `rgba(${colorR}, ${colorG}, ${colorB}, ${blurDistance})`);
    radgrad.addColorStop(1, `rgba(${colorR}, ${colorG}, ${colorB}, 0)`);

    matContext.fillStyle = radgrad;
    matContext.fillRect(0, 0, size, size);
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: auto;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: rgb(31, 31, 31);
  canvas {
    background-color: rgb(31, 31, 31);
  }
}
</style>
