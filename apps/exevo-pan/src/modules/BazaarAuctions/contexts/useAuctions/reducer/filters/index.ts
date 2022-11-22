import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { resetPagination } from '../utils'
import { Reducer, AuctionsContextState } from '../types'
import { toggleSet } from './utils'

const filterReducer: Reducer = (state, action) => {
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
          [action.toggleFilter.key]: toggleSet(
            state.filterState[action.toggleFilter.key],
            action.toggleFilter.value,
          ),
        },
      }

    default:
      return state
  }
}

const reducer: Reducer = (state, action) => {
  const nextState = filterReducer(state, action)
  resetPagination(nextState)
  /* @ ToDo: active filter count */

  return nextState
}

export default reducer
