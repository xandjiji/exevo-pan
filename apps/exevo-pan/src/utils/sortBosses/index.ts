type BossSorter = (a: BossStats, b: BossStats) => number

const chance: BossSorter = (a, b) =>
  (b.currentChance ?? 0) - (a.currentChance ?? 0)

const recentlyAppeared: BossSorter = (a, b) => {
  const [aLastAppearence] = a.lastAppearences.slice(-1)
  const [bLastAppearence] = b.lastAppearences.slice(-1)

  return (bLastAppearence ?? 0) - (aLastAppearence ?? 0)
}

const name: BossSorter = (a, b) => a.name.localeCompare(b.name)

export const sortBossesBy = { chance, recentlyAppeared, name }
