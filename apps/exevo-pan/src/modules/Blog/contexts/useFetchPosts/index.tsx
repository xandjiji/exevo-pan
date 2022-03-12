import {
  createContext,
  useContext,
  useCallback,
  useReducer,
  useEffect,
  useRef,
} from 'react'
import { useRouter } from 'next/router'
import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { BlogClient } from 'services'
import { locales } from 'Constants'
import FetchPostReducer from './reducer'
import {
  FetchPostsReducerState,
  FetchPostsContextValues,
  FetchPostsProviderProps,
  QueryParams,
} from './types'

const defaultReducerState: FetchPostsReducerState = {
  currentIndex: 0,
  postList: [],
  filterOptions: DEFAULT_FILTER_OPTIONS,
  activeFilterCount: 0,
  sortOptions: DEFAULT_SORT_OPTIONS,
  requestStatus: 'IDLE',
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
    {
      currentIndex,
      postList,
      filterOptions,
      activeFilterCount,
      sortOptions,
      requestStatus,
    },
    dispatch,
  ] = useReducer(FetchPostReducer, {
    ...defaultReducerState,
    currentIndex: initialIndex,
    postList: initialPosts,
  })

  const { locale } = useRouter()

  const fetchNextPage = useCallback(async () => {
    dispatch({ type: 'SET_STATUS', status: 'LOADING' })

    try {
      const { page, hasNext } = await BlogClient.queryBlog(
        {
          sortOptions,
          filterOptions,
          paginationOptions: {
            ...DEFAULT_PAGINATION_OPTIONS,
            pageIndex: currentIndex,
          },
        },
        locale ?? locales.DEFAULT_LOCALE,
      )

      dispatch({ type: 'APPEND_POSTS', newPosts: page, hasNext })
    } catch (error) {
      dispatch({ type: 'SET_STATUS', status: 'ERROR' })
    }
  }, [locale, currentIndex, filterOptions, sortOptions])

  const query = useCallback(
    async ({ pageIndex, ...queryArgs }: QueryParams) => {
      dispatch({ type: 'SET_STATUS', status: 'LOADING' })

      try {
        const { page, hasNext } = await BlogClient.queryBlog(
          {
            ...queryArgs,
            paginationOptions: {
              ...DEFAULT_PAGINATION_OPTIONS,
              pageIndex,
            },
          },
          locale ?? locales.DEFAULT_LOCALE,
        )

        dispatch({ type: 'SET_POSTS', posts: page, hasNext })
      } catch (error) {
        dispatch({ type: 'SET_STATUS', status: 'ERROR' })
      }
    },
    [locale],
  )

  const filterMountedCheck = useRef(false)
  useEffect(() => {
    if (filterMountedCheck.current) {
      query({ pageIndex: 0, filterOptions, sortOptions })
    } else {
      filterMountedCheck.current = true
    }
  }, [filterOptions, sortOptions])

  const localeMountedCheck = useRef(false)
  useEffect(() => {
    if (localeMountedCheck.current) {
      dispatch({ type: 'RELOAD_LIST' })
    } else {
      localeMountedCheck.current = true
    }
  }, [locale])

  return (
    <FetchPostsContext.Provider
      value={{
        currentIndex,
        postList,
        filterOptions,
        activeFilterCount,
        sortOptions,
        requestStatus,
        fetchNextPage,
        dispatchFetchPosts: dispatch,
      }}
    >
      {children}
    </FetchPostsContext.Provider>
  )
}

export const useFetchPosts = (): FetchPostsContextValues =>
  useContext(FetchPostsContext)
