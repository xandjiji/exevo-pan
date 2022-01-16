export type Action =
  | {
      type: 'SET_STATUS'
      status: RequestStatus
    }
  | {
      type: 'APPEND_POSTS'
      newPosts: BlogPost[]
      hasNext: boolean
    }
  | {
      type: 'APPLY_FILTERS'
      filterOptions?: Partial<BlogFilterOptions>
      sortOptions?: Partial<SortOptions>
    }
  | {
      type: 'SET_POSTS'
      posts: BlogPost[]
      hasNext: boolean
    }
  | {
      type: 'RELOAD_LIST'
    }

export interface FetchPostsReducerState {
  currentIndex: number
  postList: BlogPost[]
  filterOptions: BlogFilterOptions
  activeFilterCount: number
  sortOptions: SortOptions
  requestStatus: RequestStatus
  backgroundSeed: number
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

export type QueryParams = {
  pageIndex: number
  filterOptions: BlogFilterOptions
  sortOptions: SortOptions
}
