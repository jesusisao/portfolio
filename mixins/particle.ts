import { randomRange, abnormalRandom } from "./random";

type Coordinate = {
  x: number;
  y: number;
};

export class Particle {
  private canvasWidth: number;
  private canvasHeight: number;

  private particleRadius: number;
  private blur: number;
  private alpha: number;
  private color: string;

  private nowPosition: Coordinate;
  private vector: Coordinate;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    particleRadius: number,
    blur: number,
    alpha: number,
    color: string,
    nowPosition: Coordinate,
    vector: Coordinate
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.particleRadius = particleRadius;
    this.blur = blur;
    this.alpha = alpha;
    this.color = color;

    this.nowPosition = nowPosition;
    this.vector = vector;
  }

  public static buildDeepParticle = (
    canvasWidth: number,
    canvasHeight: number
  ): Particle => {
    const randomDepth = abnormalRandom();

    const particleRadius = Math.floor(randomRange(5, 120, randomDepth));
    const blur = randomRange(1, 18, randomDepth);
    const alpha = 1 - randomDepth + 0.5;
    const color = Particle.calcColor(randomDepth);

    const nowPosition: Coordinate = {
      // 位置
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight
    };
    const vector: Coordinate = Particle.generateNewVector(randomDepth);

    return new Particle(
      canvasWidth,
      canvasHeight,
      particleRadius,
      blur,
      alpha,
      color,
      nowPosition,
      vector
    );
  };

  public static buildSmallParticle = (
    canvasWidth: number,
    canvasHeight: number
  ): Particle => {
    const particleRadius = randomRange(2, 6);
    const blur = 0;
    const alpha = Math.random() * 1;
    const color = "rgb(255, 246, 201)";

    const nowPosition: Coordinate = {
      // 位置
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight
    };
    const angle = randomRange(255, 285);
    const speed = randomRange(0.2, 1.2);
    const vector: Coordinate = Particle.calcVector(angle, speed);

    return new Particle(
      canvasWidth,
      canvasHeight,
      particleRadius,
      blur,
      alpha,
      color,
      nowPosition,
      vector
    );
  };

  private static generateNewVector = (randomDepth: number) => {
    const angle = Math.random() * 360;
    const speed = (1 - randomDepth) * 0.8;
    return Particle.calcVector(angle, speed);
  };

  private static calcVector = (angle: number, speed: number): Coordinate => {
    const radian = (angle / 180) * Math.PI;
    return {
      // 移動方向
      x: Math.cos(radian) * speed,
      y: Math.sin(radian) * speed
    };
  };

  private updatePosition = () => {
    this.nowPosition.x = this.calcNewXPosition();
    this.nowPosition.y = this.calcNewYPosition();
  };

  private calcNewXPosition = (): number => {
    const newX = this.nowPosition.x + this.vector.x;
    if (newX > this.canvasWidth + 200) return -200;
    if (newX < -200) return this.canvasWidth + 200;
    return newX;
  };

  private calcNewYPosition = (): number => {
    const newY = this.nowPosition.y + this.vector.y;
    if (newY > this.canvasHeight + 200) return -200;
    if (newY < -200) return this.canvasHeight + 200;
    return newY;
  };

  private static calcColor = (randomDepth: number) => {
    const rgb = [196, 189, 155];
    // randomDepthによって明度を変える
    const r = Math.floor(randomRange(-50, 50, 1 - randomDepth));
    const [afterR, afterG, afterB] = rgb.map(num => num + r);
    return `rgb(${afterR}, ${afterG}, ${afterB})`;
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    ctx.globalAlpha = this.alpha;
    if (this.blur > 0) {
      ctx.filter = `blur(${this.blur}px)`;
    } else {
      ctx.filter = "none";
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.nowPosition.x,
      this.nowPosition.y,
      this.particleRadius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  public drawAndUpdatePosition = (ctx: CanvasRenderingContext2D) => {
    this.draw(ctx);
    this.updatePosition();
  };
}
