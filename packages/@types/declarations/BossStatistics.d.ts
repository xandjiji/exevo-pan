declare type BossAppearences = {
  name: string
  appearences: number[]
}

declare type BossStatistics = {
  server: string
  latest: {
    hash: string
    timestamp: number
  }
  bosses: Record<string, BossAppearences>
}
