export type Dataset = {
  rawServerData: Record<string, ServerObject>
  serverData: ServerObject[]
  partialCharacterData: PartialCharacterObject[]
  characterData: CharacterObject[]
  itemData: RareItemData
  statisticsData: StatisticsData
  warStatistics: WarStatistics
  miniPuneMembersData: MiniMemberWarData[]
  miniBonesMembersData: MiniMemberWarData[]
  puneMembersData: MemberWarData[]
  bonesMembersData: MemberWarData[]
  allGuildMembers: MemberWarData[]
}

export type Quantity = {
  min: number
  max: number
  precision?: number
}
