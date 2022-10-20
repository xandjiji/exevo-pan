declare type BossApparition = {
  server: string
  name: string
  timestamp: number
}

declare type FreshKillStatisticsData = {
  server: string
  hash: string
  bossApparitions: BossApparition[]
}

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
