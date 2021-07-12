export interface CharacterDataContextValues {
  loading: boolean
  characterData: CharacterObject[]
  dispatch: (action: Action) => void
}

export interface CharacterDataContextState {
  loading: boolean
  baseCharacterData: CharacterObject[]
  sortedCharacterData: CharacterObject[]
  characterData: CharacterObject[]
}

export type Action =
  | { type: 'INITIAL_DATA_LOAD'; data: CharacterObject[] }
  | { type: 'SET_LOADED' }

/* @ ToDo: sort */
/* @ ToDo: filter */
