type BossSorter = (a: BossStats, b: BossStats) => number

const chance: BossSorter = (a, b) =>
  (b.currentChance ?? 0) - (a.currentChance ?? 0)

const recentlyKilled: BossSorter = (a, b) => {
  const [aLastAppearence] = a.lastAppearences
  const [bLastAppearence] = b.lastAppearences

  return (bLastAppearence ?? 0) - (aLastAppearence ?? 0)
}

const name: BossSorter = (a, b) => a.name.localeCompare(b.name)

export const sortBossesBy = { chance, recentlyKilled, name }
