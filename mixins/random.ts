export const randomRange = (min: number, max: number, random = Math.random()): number => {
  return random * (max - min) + min;
};

export const abnormalRandom: () => number = () => {
  const normalR = Math.random();
  if (normalR > 0.7 || normalR < 0.3) {
    return normalR;
  }
  return abnormalRandom();
};
