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
}
