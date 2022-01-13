import { countObjectDiff } from 'shared-utils/dist/countObjectDiff'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { FetchPostReducerState, Action } from './types'

const updateFiltersReducer = (
  state: FetchPostReducerState,
  action: Action,
): FetchPostReducerState => {
  switch (action.type) {
    case 'APPLY_FILTERS':
      return {
        ...state,
        currentIndex: 0,
        postList: [],
        filters: action.filters,
        requestStatus: 'SUCCESSFUL',
      }

    case 'APPEND_POSTS':
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        postList: [...state.postList, ...action.newPosts],
        requestStatus: action.hasNext ? 'SUCCESSFUL' : 'EXHAUSTED',
      }

    case 'SET_STATUS':
      return {
        ...state,
        requestStatus: action.status,
      }

    case 'RELOAD_LIST':
      return {
        ...state,
        currentIndex: 0,
        postList: [],
        requestStatus: 'SUCCESSFUL',
      }

    default:
      return { ...state }
  }
}

const FetchPostReducer = (
  state: FetchPostReducerState,
  action: Action,
): FetchPostReducerState => {
  const newFilterState = updateFiltersReducer(state, action)

  const activeFilterCount = countObjectDiff(
    DEFAULT_FILTER_OPTIONS,
    state.filters,
  )

  return {
    ...newFilterState,
    activeFilterCount,
  }
}

export default FetchPostReducer
