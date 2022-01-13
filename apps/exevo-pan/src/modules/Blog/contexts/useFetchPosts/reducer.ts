import { countObjectDiff } from 'shared-utils/dist/countObjectDiff'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { FetchPostsReducerState, Action } from './types'

const INITIAL_LIST: Pick<
  FetchPostsReducerState,
  'currentIndex' | 'postList' | 'requestStatus'
> = {
  currentIndex: 0,
  postList: [],
  requestStatus: 'IDLE',
}

const updateFiltersReducer = (
  state: FetchPostsReducerState,
  action: Action,
): FetchPostsReducerState => {
  switch (action.type) {
    case 'APPLY_FILTERS':
      return {
        ...state,
        ...INITIAL_LIST,
        filterOptions: {
          ...state.filterOptions,
          ...action.filterOptions,
        },
      }

    case 'TOGGLE_TAG': {
      const newState: FetchPostsReducerState = {
        ...state,
        ...INITIAL_LIST,
      }
      if (state.filterOptions.tags.has(action.tag)) {
        newState.filterOptions.tags.delete(action.tag)
        return newState
      }
      newState.filterOptions.tags.add(action.tag)
      return newState
    }

    case 'APPLY_SORT':
      return {
        ...state,
        ...INITIAL_LIST,
        sortOptions: action.sortOptions,
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
        ...INITIAL_LIST,
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
