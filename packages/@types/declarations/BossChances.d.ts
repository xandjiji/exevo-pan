declare type BossStats = {
  name: string
  lastAppearences: number[]
  currentChance?: number
  expectedIn?: number
}

declare type BossChances = {
  server: string
  bosses: BossStats[]
  lastUpdated: number
}
