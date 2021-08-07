export interface DatabaseContextValues {
  loading: boolean
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  historyData: CharacterObject[]
  statisticsData: StatisticsData | null
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

export interface StatisticsDataContextValues {
  statisticsData: StatisticsData | null
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
  statisticsData: StatisticsData | null
}

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
      type: 'STATISTICS_DATA_LOAD'
      statisticsData: StatisticsData
    }
