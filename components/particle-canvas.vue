<template>
  <div class="wrapper" ref="canvasWrapper">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";
import { Particle } from '~/mixins/particle'

const isElement = (x: any): x is Element => x instanceof Element;

@Component({
  computed: {
    ...mapGetters({
      shouldProcessBeStopped: "particle/shouldProcessBeStopped",
      isRunning: "particle/isRunning"
    })
  },
  methods: {
    ...mapMutations({
      addRunningIds: "particle/addRunningIds",
      moveRunningIdsToStopIds: "particle/moveRunningIdsToStopIds"
    })
  }
})
export default class ParticleCanvas extends Vue {
  private static density: number = 8;
  private dots: Array<Particle> = [];
  public isRunning: any;
  public shouldProcessBeStopped: any;
  public addRunningIds: any;
  public moveRunningIdsToStopIds: any;

  mounted() {
    this.startCanvas();
  }

  startCanvas() {
    this.writeCanvas(false);
  }

  regenerateCanvas() {
    this.writeCanvas(true);
  }

  writeCanvas(doRegenerateDots: boolean) {
    this.stopCanvas()
    const { canvasWrapper } = this.$refs;
    if (!isElement(canvasWrapper)) return;
    const canvasWidth: number = canvasWrapper.clientWidth;
    const canvasHeight: number = canvasWrapper.clientHeight;
    const canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
    canvas.setAttribute("width", canvasWidth.toString());
    canvas.setAttribute("height", canvasHeight.toString());
    const canvasContext = canvas.getContext("2d");

    if (doRegenerateDots || this.dots.length === 0) {
      this.dots = []
      for (var i = 0; i < ParticleCanvas.density; i++) {
        this.dots.push(Particle.buildDeepParticle(canvasWidth, canvasHeight));
      }
      for (var i = 0; i < 50; i++) {
        this.dots.push(Particle.buildSmallParticle(canvasWidth, canvasHeight));
      }
    }
    const pid = new Date().getTime();
    this.addRunningIds(pid);
    this.updateCanvas(canvasContext, canvasWidth, canvasHeight, pid);
  }

  updateCanvas(
    canvasContext: any,
    canvasWidth: number,
    canvasHeight: number,
    pid: number
  ) {
    if (this.shouldProcessBeStopped(pid)) return;

    const forRecursion = () =>
      this.updateCanvas(canvasContext, canvasWidth, canvasHeight, pid);
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    requestAnimationFrame(forRecursion);

    for (var i = 0; i < this.dots.length; i++) {
      this.dots[i].drawAndUpdatePosition(canvasContext);
    }

    // 画面縁の影
    canvasContext!.globalAlpha = "1";
    const halfWidth = canvasWidth / 2;
    const halfHeight = canvasHeight / 2;
    const radialGradient = canvasContext.createRadialGradient(
      halfWidth,
      halfHeight,
      0,
      halfWidth,
      halfHeight,
      halfWidth
    );
    radialGradient.addColorStop(0, "rgba(30, 30, 30, 0)");
    radialGradient.addColorStop(0.8, "rgba(31, 31, 31, 0)");
    radialGradient.addColorStop(1.0, "rgba(0, 0, 0, 0.6)");
    canvasContext!.fillStyle = radialGradient;
    canvasContext!.fillRect(-5, -5, canvasWidth + 5, canvasHeight + 5);
  }

  stopCanvas() {
    console.log(this.isRunning);
    if (!this.isRunning) return;
    this.moveRunningIdsToStopIds();
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
