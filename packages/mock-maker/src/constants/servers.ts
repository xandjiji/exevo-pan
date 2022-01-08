export default {
  id: {
    MIN: 0,
    MAX: 99,
  },
  locations: [
    { string: 'BR', type: 2 },
    { string: 'EU', type: 0 },
    { string: 'NA', type: 1 },
  ] as ServerLocation[],
  pvpTypes: [
    { string: 'Hardcore', type: 3 },
    { string: 'Open', type: 1 },
    { string: 'Optional', type: 0 },
    { string: 'Retro Hardcore', type: 4 },
    { string: 'Retro Open', type: 2 },
  ] as PvpType[],
}
