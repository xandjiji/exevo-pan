export default {
  id: {
    MIN: 0,
    MAX: 9999999,
  },
  currentBid: {
    MIN: 57,
    MAX: 300000,
  },
  vocationId: {
    MIN: 0,
    MAX: 4,
  },
  level: {
    MIN: 8,
    MAX: 2000,
  },
  skills: {
    MIN: 10,
    MAX: 130,
    PRECISION: 0.01,
  },
  items: {
    size: {
      MIN: 0,
      MAX: 4,
    },
    id: {
      MIN: 3100,
      MAX: 3400,
    },
    tier: {
      CHANCE: 0.1,
      MIN: 1,
      MAX: 10,
    },
  },
  outfit: {
    addon: {
      MIN: 0,
      MAX: 3,
    },
    regular: {
      MIN: 8,
      MAX: 36,
    },
    store: {
      MIN: 0,
      MAX: 4,
    },
  },
  storeItem: {
    array: { min: 0, max: 15 },
    amount: { min: 1, max: 5 },
  },
  achievementPoints: { min: 0, max: 2000 },
  charmInfo: {
    spent: { min: 0, max: 4800 },
    unspent: { min: 0, max: 900 },
  },
  hirelings: {
    count: { min: 0, max: 4 },
    jobs: { min: 0, max: 4 },
    outfits: { min: 0, max: 8 },
  },
}
