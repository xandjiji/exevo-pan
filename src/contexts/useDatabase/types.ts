export interface DatabaseContextValues {
  loading: boolean
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  historyData: CharacterObject[]
  dispatch: (action: Action) => void
}

export interface DatabaseContextState {
  loading: boolean
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
    }
  | {
      type: 'INITIAL_CHARACTER_DATA_LOAD'
      characterData: CharacterObject[]
      serverData: ServerObject[]
      rareItemData: RareItemData
    }
  | {
      type: 'INITIAL_HISTORY_DATA_LOAD'
      characterData: CharacterObject[]
      serverData: ServerObject[]
      rareItemData: RareItemData
    }
  | { type: 'SET_LOADING'; value: boolean }
