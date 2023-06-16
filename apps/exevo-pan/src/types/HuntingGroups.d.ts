declare type PublicHuntingGroup = {
  id: string
  name: string
  private: boolean
  server: string
  description: string | null
  createdAt: Date
  avatarId: number
  avatarDegree: number
  memberCount: number
}

declare type CheckedBoss = {
  location: string
  checkedAt?: Date
  checkedBy?: string
  lastSpawned?: Date
} & BossStats

declare type HuntingGroupsStatisticsEntry = {
  name: string
  count: number
  percentage: number
}

declare type HuntingGroupsStatisticsSet = {
  boss: HuntingGroupsStatisticsEntry[]
  members: HuntingGroupsStatisticsEntry[]
}
