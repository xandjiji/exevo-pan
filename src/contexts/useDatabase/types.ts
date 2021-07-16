export interface DatabaseContextValues {
  loading: boolean
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  historyData: CharacterObject[]
  dispatch: (action: Action) => void
}

export interface DatabaseReducerState {
  baseCharacterData: CharacterObject[]
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  baseHistoryData: CharacterObject[]
  historyData: CharacterObject[]
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
