declare type HuntingGroupsStatisticsEntry = {
  name: string
  count: number
  percentage: number
}

declare type HuntingGroupsStatisticsSet = {
  boss: HuntingGroupsStatisticsEntry[]
  members: HuntingGroupsStatisticsEntry[]
}
