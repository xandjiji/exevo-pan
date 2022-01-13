export type Action =
  | {
      type: 'APPLY_FILTERS'
      filterOptions: Partial<BlogFilterOptions>
    }
  | {
      type: 'TOGGLE_TAG'
      tag: string
    }
  | {
      type: 'APPEND_POSTS'
      newPosts: BlogPost[]
      hasNext: boolean
    }
  | {
      type: 'SET_STATUS'
      status: RequestStatus
    }
  | {
      type: 'RELOAD_LIST'
    }

export interface FetchPostsReducerState {
  currentIndex: number
  postList: BlogPost[]
  filterOptions: BlogFilterOptions
  activeFilterCount: number
  requestStatus: RequestStatus
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
