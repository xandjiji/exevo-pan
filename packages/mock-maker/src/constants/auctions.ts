export default {
  id: {
    min: 0,
    max: 9999999,
  },
  currentBid: {
    min: 57,
    max: 300000,
  },
  vocationId: {
    min: 0,
    max: 4,
  },
  level: {
    min: 8,
    max: 2000,
  },
  bossPoints: {
    min: 0,
    max: 5000,
  },
  tcInvested: {
    min: 0,
    max: 30000,
  },
  skills: {
    min: 10,
    max: 130,
    precision: 0.01,
  },
  items: {
    array: {
      min: 0,
      max: 4,
    },
    id: {
      min: 3100,
      max: 3400,
    },
    tier: {
      CHANCE: 0.1,
      min: 1,
      max: 10,
    },
  },
  outfit: {
    addon: {
      min: 0,
      max: 3,
    },
    regular: {
      min: 8,
      max: 36,
    },
    store: {
      min: 0,
      max: 4,
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
