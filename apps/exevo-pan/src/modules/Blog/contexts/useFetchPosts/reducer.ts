import { countObjectDiff } from 'shared-utils/dist/countObjectDiff'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { FetchPostsReducerState, Action } from './types'

const updateFiltersReducer = (
  state: FetchPostsReducerState,
  action: Action,
): FetchPostsReducerState => {
  switch (action.type) {
    case 'APPLY_FILTERS':
      return {
        ...state,
        currentIndex: 0,
        postList: [],
        filterOptions: {
          ...state.filterOptions,
          ...action.filterOptions,
        },
        requestStatus: 'IDLE',
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
        requestStatus: 'IDLE',
      }

    default:
      return { ...state }
  }
}

const FetchPostReducer = (
  state: FetchPostsReducerState,
  action: Action,
): FetchPostsReducerState => {
  const newFilterState = updateFiltersReducer(state, action)

  const activeFilterCount = countObjectDiff(
    DEFAULT_FILTER_OPTIONS,
    state.filterOptions,
  )

  return {
    ...newFilterState,
    activeFilterCount,
  }
}

export default FetchPostReducer
