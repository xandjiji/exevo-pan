import { createContext, useContext, useCallback, useReducer } from 'react'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { BlogClient } from 'services'
import FetchPostReducer from './reducer'
import {
  FetchPostsReducerState,
  FetchPostsContextValues,
  FetchPostsProviderProps,
} from './types'

const defaultReducerState: FetchPostsReducerState = {
  currentIndex: 0,
  postList: [],
  filterOptions: DEFAULT_FILTER_OPTIONS,
  activeFilterCount: 0,
  requestStatus: 'SUCCESSFUL',
}

const FetchPostsContext = createContext<FetchPostsContextValues>({
  ...defaultReducerState,
  fetchNextPage: () => Promise.resolve(),
  dispatchFetchPosts: () => {},
})

export const FetchPostsProvider = ({
  initialIndex,
  initialPosts,
  children,
}: FetchPostsProviderProps): JSX.Element => {
  const [
    { currentIndex, postList, filterOptions, activeFilterCount, requestStatus },
    dispatch,
  ] = useReducer(FetchPostReducer, {
    ...defaultReducerState,
    currentIndex: initialIndex,
    postList: initialPosts,
  })

  const fetchNextPage = useCallback(async () => {
    dispatch({ type: 'SET_STATUS', status: 'LOADING' })

    try {
      const { page, hasNext } = await BlogClient.queryBlog({ filterOptions })

      dispatch({ type: 'APPEND_POSTS', newPosts: page, hasNext })
    } catch (error) {
      dispatch({ type: 'SET_STATUS', status: 'ERROR' })
    }
  }, [currentIndex, filterOptions])

  return (
    <FetchPostsContext.Provider
      value={{
        currentIndex,
        postList,
        filterOptions,
        activeFilterCount,
        requestStatus,
        fetchNextPage,
        dispatchFetchPosts: dispatch,
      }}
    >
      {children}
    </FetchPostsContext.Provider>
  )
}

export const useFetchPromos = (): FetchPostsContextValues =>
  useContext(FetchPostsContext)
