declare type BossStats = {
  name: string
  lastAppearence?: number
  currentChance?: number
  expectedIn?: number
  daysLeftForPossibleSpawns?: number[]
}

declare type BossChances = {
  server: string
  bosses: BossStats[]
  lastUpdated: number
}
