declare type BossAppearences = {
  name: string
  appearences: number[]
}

type BossToken = string

declare type BossStatistics = {
  server: string
  latest: {
    hash: string
    timestamp: number
  }
  bosses: Record<BossToken, BossAppearences>
}
