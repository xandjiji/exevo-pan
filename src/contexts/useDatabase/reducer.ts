import { DatabaseContextState, Action } from './types'

export default (
  state: DatabaseContextState,
  action: Action,
): DatabaseContextState => {
  switch (action.type) {
    case 'INITIAL_DATA_LOAD':
      return {
        ...state,
        baseCharacterData: action.characterData,
        characterData: action.characterData,
        serverData: action.serverData,
        rareItemData: action.rareItemData,
      }

    case 'SET_LOADED':
      return {
        ...state,
        loading: false,
      }

    case 'APPLY_FILTERS':
      console.log(action.filters)
      return {
        ...state,
      }

    default:
      return { ...state }
  }
}
