import { dequal } from 'dequal'
import { urlParametersState } from 'utils'
import { filterSchema } from 'modules/BazaarAuctions/components/FilterDrawer/schema'
import { DatabaseReducerState, Action } from './types'
import { filterCharacters, filterHighlightedAuctions } from './utils'

const { getUrlValues, defaultValues } = urlParametersState(filterSchema)

const DatabaseReducer = (
  state: DatabaseReducerState,
  action: Action,
): DatabaseReducerState => {
  switch (action.type) {
    case 'INITIAL_DATA_LOAD': {
      const initialFilters = {
        ...defaultValues,
        ...getUrlValues(),
      } as FilterState
      const hasInitialFilters = !dequal(initialFilters, defaultValues)
      const filteredInitialData = hasInitialFilters
        ? filterCharacters(
            action.characterData,
            action.rareItemData,
            initialFilters,
          )
        : action.characterData

      if (action.isHistory) {
        return {
          ...state,
          baseHistoryData: action.characterData,
          historyData: filteredInitialData,
          serverData: action.serverData,
          rareItemData: action.rareItemData,
        }
      }
      return {
        ...state,
        baseCharacterData: action.characterData,
        characterData: filteredInitialData,
        highlightedAuctions: filterHighlightedAuctions(
          action.characterData,
          action.highlightedAuctions,
        ),
        serverData: action.serverData,
        rareItemData: action.rareItemData,
      }
    }

    case 'WAR_GUILD_DATA_LOAD':
      return { ...state, warGuildData: action.warGuildData }

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
      }
      return {
        ...state,
        characterData: filterCharacters(
          state.baseCharacterData,
          state.rareItemData,
          action.filters,
        ),
      }

    case 'RESET_TO_BASE_DATA':
      return {
        ...state,
        historyData: state.baseHistoryData,
        characterData: state.baseCharacterData,
      }

    default:
      return { ...state }
  }
}

export default DatabaseReducer
