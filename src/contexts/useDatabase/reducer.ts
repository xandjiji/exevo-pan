import { DatabaseContextState, Action } from './types'
import { filterCharacters } from './utils'

export default (
  state: DatabaseContextState,
  action: Action,
): DatabaseContextState => {
  switch (action.type) {
    case 'INITIAL_DATA_LOAD':
      if (action.isHistory) {
        return {
          ...state,
          baseHistoryData: action.characterData,
          historyData: action.characterData,
          serverData: action.serverData,
          rareItemData: action.rareItemData,
        }
      } else {
        return {
          ...state,
          baseCharacterData: action.characterData,
          characterData: action.characterData,
          serverData: action.serverData,
          rareItemData: action.rareItemData,
        }
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.value,
      }

    case 'APPLY_FILTERS':
      if (action.isHistory) {
        return {
          ...state,
          historyData: filterCharacters(
            state.baseHistoryData,
            state.rareItemData,
            action.filters,
          ),
        }
      } else {
        return {
          ...state,
          characterData: filterCharacters(
            state.baseCharacterData,
            state.rareItemData,
            action.filters,
          ),
        }
      }

    default:
      return { ...state }
  }
}
