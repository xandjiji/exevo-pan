export interface DatabaseContextValues {
  loading: boolean
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  dispatch: (action: Action) => void
}

export interface DatabaseContextState {
  loading: boolean
  baseCharacterData: CharacterObject[]
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
}

export type Action =
  | {
      type: 'APPLY_FILTERS'
      filters: FilterState
    }
  | {
      type: 'INITIAL_DATA_LOAD'
      characterData: CharacterObject[]
      serverData: ServerObject[]
      rareItemData: RareItemData
    }
  | { type: 'SET_LOADED' }

/* @ ToDo: filter */
