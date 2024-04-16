export const getRandomPosition = (max: number, size: number) =>
  Math.random() * (max - size) + size / 2;
