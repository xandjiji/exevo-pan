const ADS_EVERY_COUNT = 3

export const shouldInsertAd = (index: number): boolean =>
  (index + 1) % ADS_EVERY_COUNT === 0
