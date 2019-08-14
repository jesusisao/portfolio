<template>
  <div class="wrapper" ref="canvasWrapper">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

type Position = {
  x: number;
  y: number;
};

const calcAbnormalRandom: () => number = () => {
  const normalR = Math.random()
  if (normalR > 0.7 || normalR < 0.3) {
    return normalR
  }
  return calcAbnormalRandom()
}

// 改造元：https://www.webopixel.net/javascript/1271.html

class Dot {
  private static baseSize = 5;

  private randomDepth = calcAbnormalRandom();
  private size = Math.floor(this.randomDepth * 150) + Dot.baseSize;
  private blur = this.calcBlurPx(this.randomDepth);
  private alpha = 1 - this.randomDepth + 0.5;
  private color = "#9b90b0";
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
      return 3;
    }
    if (randomDepth >= 0.8) {
      return 15;
    }
    return randomDepth * 15;
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
    if (this.pos.x > this.canvasWidth + 100) {
      this.pos.x = -100;
    } else if (this.pos.x < -100) {
      this.pos.x = this.canvasWidth + 100;
    } else if (this.pos.y > this.canvasHeight + 100) {
      this.pos.y = -100;
    } else if (this.pos.y < -100) {
      this.pos.y = this.canvasHeight + 100;
    }
  }
}

const isElement = (x: any): x is Element => x instanceof Element;

@Component
export default class Particle extends Vue {
  private static density: number = 15;
  private dots: Array<Dot> = [];

  mounted() {
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
    this.updateCanvas(canvasContext, canvasWidth, canvasHeight);
  }

  updateCanvas(canvasContext: any, canvasWidth: number, canvasHeight: number) {
    const forRecursion = () =>
      this.updateCanvas(canvasContext, canvasWidth, canvasHeight);
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    requestAnimationFrame(forRecursion);

    for (var i = 0; i < Particle.density; i++) {
      this.dots[i].update(canvasContext);
    }
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
  canvas {
    background-color: #666666;
  }
}
</style>
