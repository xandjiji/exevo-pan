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
  miniPuneMembersData: MiniMemberWarData[]
  miniBonesMembersData: MiniMemberWarData[]
  puneMembersData: MemberWarData[]
  bonesMembersData: MemberWarData[]
}
