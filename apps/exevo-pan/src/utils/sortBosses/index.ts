type BossSorter = (a: BossStats, b: BossStats) => number

const chance: BossSorter = (a, b) =>
  (b.currentChance ?? -1) - (a.currentChance ?? -1)

const recentlyAppeared: BossSorter = (a, b) =>
  (a.lastAppearence ?? 0) - (b.lastAppearence ?? 0)

const name: BossSorter = (a, b) => a.name.localeCompare(b.name)

export const sortBossesBy = { chance, recentlyAppeared, name }
