declare type BossStats = {
  name: string
  currentChance?: number
  lastAppearences: number[]
}

declare type BossChances = {
  server: string
  bosses: BossStats[]
  lastUpdated: number
}
