import { CharacterDataContextState, Action } from './types'

export default (
  state: CharacterDataContextState,
  action: Action,
): CharacterDataContextState => {
  switch (action.type) {
    case 'INITIAL_DATA_LOAD':
      return {
        ...state,
        baseCharacterData: action.data,
        sortedCharacterData: action.data,
        characterData: action.data,
      }

    case 'SET_LOADED':
      return {
        ...state,
        loading: false,
      }

    /* @ ToDo: sort */
    /* @ ToDo: filter */

    default:
      return { ...state }
  }
}
