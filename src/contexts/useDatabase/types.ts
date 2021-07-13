export interface DatabaseContextValues {
  loading: boolean
  characterData: CharacterObject[]
  serverData: ServerObject[]
  dispatch: (action: Action) => void
}

export interface DatabaseContextState {
  loading: boolean
  baseCharacterData: CharacterObject[]
  characterData: CharacterObject[]
  serverData: ServerObject[]
}

export type Action =
  | {
      type: 'INITIAL_DATA_LOAD'
      characterData: CharacterObject[]
      serverData: ServerObject[]
    }
  | { type: 'SET_LOADED' }

/* @ ToDo: filter */

/* usar any no filter action.filters */
