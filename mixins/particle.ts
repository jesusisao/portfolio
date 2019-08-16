import { randomRange } from "./random";

type Coordinate = {
  x: number;
  y: number;
};

export class Particle {
  private canvasWidth: number;
  private canvasHeight: number;

  private particleRadius: number;
  private blur: number;  // 数字が大きいほどはっきりしてる
  private alpha: number;
  private rgb: [number, number, number];

  private nowPosition: Coordinate;
  private vector: Coordinate;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    particleRadius: number,
    blur: number,
    alpha: number,
    rgb: [number, number, number],
    nowPosition: Coordinate,
    vector: Coordinate
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.particleRadius = particleRadius;
    this.blur = blur;
    this.alpha = alpha;
    this.rgb = rgb;

    this.nowPosition = nowPosition;
    this.vector = vector;
  }

  public static buildDeepParticle = (
    canvasWidth: number,
    canvasHeight: number
  ): Particle => {
    const randomDepth = Math.random();

    const particleRadius = Math.floor(randomRange(5, 120, randomDepth));
    const blur = randomRange(0.7, 0.9, 1 - randomDepth);
    const alpha = 1 - randomDepth + 0.5;
    const rgb = Particle.calcRgb(randomDepth);

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
      rgb,
      nowPosition,
      vector
    );
  };

  public static buildSmallParticle = (
    canvasWidth: number,
    canvasHeight: number
  ): Particle => {
    const particleRadius = randomRange(2, 6);
    const blur = 1;
    const alpha = Math.random() * 1;
    const rgb: [number, number, number] = [255, 246, 201];

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
      rgb,
      nowPosition,
      vector
    );
  };

  private static generateNewVector = (randomDepth: number) => {
    const angle = Math.random() * 360;
    const speed = (1 - randomDepth) * 0.4;
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

  private static calcRgb = (randomDepth: number): [number, number, number] => {
    const rgb = [196, 189, 155];
    // randomDepthによって明度を変える
    const r = Math.floor(randomRange(-50, 50, 1 - randomDepth));
    const [afterR, afterG, afterB] = rgb.map(num => num + r);
    return [afterR, afterG, afterB];
  };

  private createRgbStr = (): string => {
    return `${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}`
  }

  public draw = (ctx: CanvasRenderingContext2D) => {
    ctx.globalAlpha = this.alpha;
    const radgrad = ctx.createRadialGradient(
      this.nowPosition.x,
      this.nowPosition.y,
      0,
      this.nowPosition.x,
      this.nowPosition.y,
      this.particleRadius
    );
    radgrad.addColorStop(0, `rgba(${this.createRgbStr()}, 1)`);
    radgrad.addColorStop(this.blur, `rgba(${this.createRgbStr()}, ${this.blur})`);
    radgrad.addColorStop(1, `rgba(${this.createRgbStr()}, 0)`);
    // draw shape
    ctx.fillStyle = radgrad;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  };

  public drawAndUpdatePosition = (ctx: CanvasRenderingContext2D) => {
    this.draw(ctx);
    this.updatePosition();
  };
}
