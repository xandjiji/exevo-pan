export type Action =
  | {
      type: 'APPLY_FILTERS'
      filters: FilterState
      isHistory: boolean
    }
  | {
      type: 'INITIAL_DATA_LOAD'
      characterData: CharacterObject[]
      serverData: ServerObject[]
      rareItemData: RareItemData
      isHistory: boolean
    }
  | {
      type: 'RESET_TO_BASE_DATA'
    }
  | {
      type: 'WAR_STATISTICS_DATA_LOAD'
      warStatisticsData: WarStatistics
    }
  | {
      type: 'WAR_GUILD_DATA_LOAD'
      warGuildData: MemberWarData[]
    }

export interface DatabaseContextValues {
  loading: boolean
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  historyData: CharacterObject[]
  warStatisticsData: WarStatistics | null
  dispatch: (action: Action) => void
}

export interface CharactersContextValues {
  loading: boolean
  characterData: CharacterObject[]
  historyData: CharacterObject[]
}

export interface DrawerFieldsContextValues {
  loading: boolean
  serverData: ServerObject[]
  rareItemData: RareItemData
}

export interface WarStatisticsDataContextValues {
  warStatisticsData: WarStatistics | null
  loading: boolean
}

export interface DatabaseDispatchContextValues {
  dispatch: (action: Action) => void
}

export interface DatabaseReducerState {
  baseCharacterData: CharacterObject[]
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  baseHistoryData: CharacterObject[]
  historyData: CharacterObject[]
  warStatisticsData: WarStatistics | null
}
