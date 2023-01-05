import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { countActiveFilters, resetPagination } from '../utils'
import { Reducer } from '../types'
import { FilterAction } from './types'
import { toggleSet } from './utils'

const FilterReducer: Reducer<FilterAction> = (state, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filterState: { ...state.filterState, ...action.filterOptions },
      }

    case 'SET_SIMILAR_FILTERS':
      return {
        ...state,
        filterState: { ...DEFAULT_FILTER_OPTIONS, ...action.filterOptions },
      }

    case 'TOGGLE_FILTER':
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]: !state.filterState[action.key],
        },
      }

    case 'TOGGLE_FILTER_SET':
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]: toggleSet(state.filterState[action.key], action.value),
        },
      }

    case 'TOGGLE_ALL_FILTER_SET_OPTION':
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]:
            state.filterState[action.key].size === action.allOptions.length
              ? new Set([])
              : new Set(action.allOptions.map(({ value }) => value)),
        },
      }

    case 'TOGGLE_ADDON': {
      const currentAddon = state.filterState.addon

      return {
        ...state,
        filterState: {
          ...state.filterState,
          addon:
            currentAddon === 3 || currentAddon === action.value
              ? currentAddon - action.value
              : currentAddon + action.value,
        },
      }
    }

    case 'RESET_FILTERS':
      return { ...state, filterState: DEFAULT_FILTER_OPTIONS }

    default:
      return state
  }
}

const reducer: Reducer<FilterAction> = (state, action) => {
  const nextState = FilterReducer(state, action)

  nextState.activeFilterCount = countActiveFilters(
    DEFAULT_FILTER_OPTIONS,
    nextState.filterState,
  )

  return resetPagination(nextState)
}

export default reducer
