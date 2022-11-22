import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { resetPagination } from '../utils'
import { Reducer, AuctionsContextState } from '../types'
import { FilterAction } from './types'
import { toggleSet } from './utils'

const filterReducer: Reducer<FilterAction> = (state, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filterState: { ...state.filterState, ...action.filterOptions },
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

    default:
      return state
  }
}

const reducer: Reducer<FilterAction> = (state, action) => {
  const nextState = filterReducer(state, action)
  resetPagination(nextState)
  /* @ ToDo: active filter count */

  return nextState
}

export default reducer
