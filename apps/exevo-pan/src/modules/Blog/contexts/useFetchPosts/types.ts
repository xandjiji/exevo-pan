type StatusRequest = 'SUCCESSFUL' | 'ERROR' | 'LOADING' | 'EXHAUSTED'

export type Action =
  | {
      type: 'APPLY_FILTERS'
      filterOptions: BlogFilterOptions
    }
  | {
      type: 'APPEND_POSTS'
      newPosts: BlogPost[]
      hasNext: boolean
    }
  | {
      type: 'SET_STATUS'
      status: StatusRequest
    }
  | {
      type: 'RELOAD_LIST'
    }

export interface FetchPostsReducerState {
  currentIndex: number
  postList: BlogPost[]
  filterOptions: BlogFilterOptions
  activeFilterCount: number
  requestStatus: StatusRequest
}

export interface FetchPostsContextValues extends FetchPostsReducerState {
  fetchNextPage: () => Promise<void>
  dispatchFetchPosts: React.Dispatch<Action>
}

export interface FetchPostsProviderProps {
  children: React.ReactNode
  initialPosts: BlogPost[]
  initialIndex: number
}
