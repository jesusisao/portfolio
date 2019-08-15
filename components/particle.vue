<template>
  <div class="wrapper" ref="canvasWrapper">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";

type Position = {
  x: number;
  y: number;
};

const calcAbnormalRandom: () => number = () => {
  const normalR = Math.random();
  if (normalR > 0.7 || normalR < 0.3) {
    return normalR;
  }
  return calcAbnormalRandom();
};

// 改造元：https://www.webopixel.net/javascript/1271.html

class Dot {
  private static baseSize = 3;

  private randomDepth = calcAbnormalRandom();
  private size = Math.floor(this.randomDepth * 120) + Dot.baseSize;
  private blur = this.calcBlurPx(this.randomDepth);
  private alpha = 1 - this.randomDepth + 0.5;
  private color = this.calcColor(this.randomDepth);
  private speed = (1 - this.randomDepth) * 0.8;
  private rot = Math.random() * 360; // ランダムな角度
  private angle = (this.rot * Math.PI) / 180;
  private pos: Position;
  private vec: Position = {
    // 移動方向
    x: Math.cos(this.angle) * this.speed,
    y: Math.sin(this.angle) * this.speed
  };
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.pos = {
      // 位置
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight
    };
  }

  private calcBlurPx(randomDepth: number) {
    if (randomDepth < 0.5) {
      return 2;
    }
    if (randomDepth >= 0.8) {
      return 15;
    }
    return randomDepth * 15;
  }

  private calcColor(randomDepth: number) {
    const originR = 196;
    const originG = 189;
    const originB = 155;
    const r = (1 - randomDepth - 0.5) * 100;
    const afterR = originR + r;
    const afterG = originG + r;
    const afterB = originB + r;
    return `rgb(${afterR}, ${afterG}, ${afterB})`;
  }

  public draw(canvasCtx: any) {
    canvasCtx.globalAlpha = this.alpha;
    canvasCtx.filter = `blur(${this.blur}px)`;
    canvasCtx.fillStyle = this.color;
    canvasCtx.beginPath();
    canvasCtx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
    canvasCtx.fill();
  }

  public update(canvasCtx: any) {
    this.draw(canvasCtx);
    this.pos.x += this.vec.x;
    this.pos.y += this.vec.y;

    // 画面外に出たら反対へ再配置
    if (this.pos.x > this.canvasWidth + 200) {
      this.pos.x = -200;
    } else if (this.pos.x < -200) {
      this.pos.x = this.canvasWidth + 200;
    } else if (this.pos.y > this.canvasHeight + 200) {
      this.pos.y = -200;
    } else if (this.pos.y < -200) {
      this.pos.y = this.canvasHeight + 200;
    }
  }
}

// ------------------------------------------------------------

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
export default class Particle extends Vue {
  private static density: number = 15;
  private dots: Array<Dot> = [];
  public isRunning: any;
  public shouldProcessBeStopped: any;
  public addRunningIds: any;
  public moveRunningIdsToStopIds: any;

  mounted() {
    this.startCanvas();
  }

  startCanvas() {
    const { canvasWrapper } = this.$refs;
    if (!isElement(canvasWrapper)) return;
    const canvasWidth: number = canvasWrapper.clientWidth;
    const canvasHeight: number = canvasWrapper.clientHeight;
    const canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
    canvas.setAttribute("width", canvasWidth.toString());
    canvas.setAttribute("height", canvasHeight.toString());
    const canvasContext = canvas.getContext("2d");

    for (var i = 0; i < Particle.density; i++) {
      this.dots.push(new Dot(canvasWidth, canvasHeight));
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

    for (var i = 0; i < Particle.density; i++) {
      this.dots[i].update(canvasContext);
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
  background-color: rgb(255, 255, 255);
  canvas {
    background-color: rgb(31, 31, 31);
  }
}
</style>
