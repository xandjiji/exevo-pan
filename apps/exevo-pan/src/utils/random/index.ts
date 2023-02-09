export const randomIntFromRange = ([min, max]: [number, number]) =>
  Math.floor(Math.random() * (max - min + 1) + min)
