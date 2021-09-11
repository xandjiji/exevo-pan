export type Dataset = {
  rawServerData: Record<string, ServerObject>
  serverData: ServerObject[]
  minifiedCharacterData: MinifiedCharacterObject[]
  partialCharacterData: PartialCharacterObject[]
  characterData: CharacterObject[]
  rawItemData: RareItemData
  itemData: RareItemData
  statisticsData: StatisticsData
  warStatistics: WarStatistics
  miniMembersWarData: MiniMemberWarData[]
  puneMembersData: MemberWarData[]
  bonesMembersData: MemberWarData[]
}
