// だいぶ変わったけど改造元：https://www.webopixel.net/javascript/1271.html

type Coordinate = {
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

export class Particle {
  private randomDepth = calcAbnormalRandom();
  private particleRadius = Math.floor(this.randomDepth * 115) + 5;
  private blur = Particle.calcBlurPx(this.randomDepth);
  private alpha = 1 - this.randomDepth + 0.5;
  private color = Particle.calcColor(this.randomDepth);

  private nowPosition: Coordinate;
  private vector: Coordinate = Particle.generateNewVector(this.randomDepth);

  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.nowPosition = {
      // 位置
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight
    };
  }

  private static generateNewVector = (randomDepth: number) => {
    const angle = Math.random() * 360;
    const speed = (1 - randomDepth) * 0.8;
    return Particle.calcVector(angle, speed);
  };

  private static calcVector: (angle: number, speed: number) => Coordinate = (
    angle,
    speed
  ) => {
    const radian = (angle / 180) * Math.PI;
    return {
      // 移動方向
      x: Math.cos(radian) * speed,
      y: Math.sin(radian) * speed
    };
  };

  private static calcBlurPx = (randomDepth: number) => {
    if (randomDepth < 0.5) return 2;
    if (randomDepth >= 0.8) return 15;
    return randomDepth * 15;
  }

  private updatePosition = () => {
    this.nowPosition.x = this.calcNewXPosition();
    this.nowPosition.y = this.calcNewYPosition();
  };

  private calcNewXPosition: () => number = () => {
    const newX = this.nowPosition.x + this.vector.x;
    if (newX > this.canvasWidth + 200) return -200;
    if (newX < -200) return this.canvasWidth + 200;
    return newX
  };

  private calcNewYPosition: () => number = () => {
    const newY = this.nowPosition.y + this.vector.y;
    if (newY > this.canvasHeight + 200) return -200;
    if (newY < -200) return this.canvasHeight + 200;
    return newY
  };

  private static calcColor = (randomDepth: number) => {
    const originR = 196;
    const originG = 189;
    const originB = 155;
    const r = (1 - randomDepth - 0.5) * 100;
    const afterR = originR + r;
    const afterG = originG + r;
    const afterB = originB + r;
    return `rgb(${afterR}, ${afterG}, ${afterB})`;
  }

  public draw = (canvasCtx: any) => {
    canvasCtx.globalAlpha = this.alpha;
    canvasCtx.filter = `blur(${this.blur}px)`;
    canvasCtx.fillStyle = this.color;
    canvasCtx.beginPath();
    canvasCtx.arc(
      this.nowPosition.x,
      this.nowPosition.y,
      this.particleRadius,
      0,
      2 * Math.PI,
      false
    );
    canvasCtx.fill();
  };

  public drawAndUpdatePosition = (canvasCtx: any) => {
    this.draw(canvasCtx);
    this.updatePosition();
  };
}
