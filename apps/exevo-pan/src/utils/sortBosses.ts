type BossSorter = (a: BossStats, b: BossStats) => number

const PRIORITY = {
  CHANCE: 30_000,
  MULTIPLE_SPAWNS: 20_000,
  EXPECTED_IN: 10_000,
  UNKNOWN: -1,
}

const priorityValue = ({
  currentChance,
  daysLeftForPossibleSpawns,
  expectedIn,
}: BossStats): number => {
  if (currentChance !== undefined && currentChance > 0) {
    return PRIORITY.CHANCE + currentChance
  }

  if (daysLeftForPossibleSpawns !== undefined) {
    return (
      PRIORITY.MULTIPLE_SPAWNS +
      daysLeftForPossibleSpawns.reduce(
        (acc, current) => (current <= 0 ? acc + 1 : acc),
        0,
      )
    )
  }

  if (expectedIn !== undefined) return PRIORITY.EXPECTED_IN - expectedIn

  return PRIORITY.UNKNOWN
}

const chance: BossSorter = (a, b) => priorityValue(b) - priorityValue(a)

const recentlyAppeared: BossSorter = (a, b) =>
  (b.lastAppearence ?? 0) - (a.lastAppearence ?? 0)

const name: BossSorter = (a, b) => a.name.localeCompare(b.name)

export const sortBossesBy = { chance, recentlyAppeared, name }
