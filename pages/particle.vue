<template>
  <div class="wrapper" ref="canvasWrapper">
    <canvas id="canvas" ref="canvas" style="background-color:white;"></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

type Position = {
  x: number;
  y: number;
};

// 参考：https://www.webopixel.net/javascript/1271.html

class Dot {
  private static baseSize = 3;
  private static colors = ["#eeb900", "#6DD0A5", "#f799db"];
  private static baseSpeed = 10;

  private size = Math.floor(Math.random() * 6) + Dot.baseSize; //大きさ
  private color = Dot.colors[~~(Math.random() * 3)]; //色
  private speed = this.size / Dot.baseSpeed; // 大きさによって速度変更
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

  public draw(canvasCtx: any) {
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
    if (this.pos.x > this.canvasWidth + 10) {
      this.pos.x = -5;
    } else if (this.pos.x < 0 - 10) {
      this.pos.x = this.canvasWidth + 5;
    } else if (this.pos.y > this.canvasHeight + 10) {
      this.pos.y = -5;
    } else if (this.pos.y < 0 - 10) {
      this.pos.y = this.canvasHeight + 5;
    }
  }
}

const isElement = (x: any): x is Element => x instanceof Element;

@Component
export default class Particle extends Vue {
  private static density: number = 70;
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
    this.update(canvasContext, canvasWidth, canvasHeight);
  }

  update(canvasContext: any, canvasWidth: number, canvasHeight: number) {
    const forRecursion = () =>
      this.update(canvasContext, canvasWidth, canvasHeight);
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
    // width: auto;
    // height: 100%;
  }
}
</style>
