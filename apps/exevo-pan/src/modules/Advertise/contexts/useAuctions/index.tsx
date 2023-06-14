import {
  createContext,
  useContext,
  useRef,
  useReducer,
  useCallback,
  useEffect,
} from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { LoadingAlert } from 'components/Atoms'
import { useIsMounted } from 'hooks'
import { AuctionsClient } from 'services/client'
import AuctionsReducer from './reducer'
import { DEFAULT_STATE } from './schema'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

export const AuctionsProvider = ({
  initialPage,
  initialPageData,
  children,
}: AuctionsProviderProps) => {
  const { common } = useTranslations()

  const [state, dispatch] = useReducer(AuctionsReducer, {
    loading: DEFAULT_STATE.loading,
    nickname: DEFAULT_STATE.nickname,
    page: initialPage,
    pageData: initialPageData,
  })

  const {
    nickname,
    pageData: { pageIndex },
  } = state

  const previousNickname = useRef(DEFAULT_STATE.nickname)
  const fetchData = useCallback(
    async (newPageIndex: number, newNickname: string) => {
      dispatch({ type: 'SET_LOADING' })

      const nicknameChanged = previousNickname.current !== newNickname
      const data = await AuctionsClient.fetchAuctionPage({
        paginationOptions: { pageIndex: nicknameChanged ? 0 : newPageIndex },
        filterOptions: { nicknameFilter: newNickname },
        history: false,
      })

      previousNickname.current = newNickname
      dispatch({ type: 'STORE_DATA', data })
    },
    [],
  )

  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) {
      fetchData(pageIndex, nickname)
    }
  }, [pageIndex, nickname, fetchData])

  const handlePaginatorFetch = useCallback((newPageIndex: number) => {
    dispatch({ type: 'SET_PAGE_INDEX', value: newPageIndex - 1 })
  }, [])

  const handleNicknameFetch = useCallback((newNickname: string) => {
    dispatch({ type: 'SET_NICKNAME', value: newNickname })
  }, [])

  return (
    <AuctionsContext.Provider
      value={{ ...state, handlePaginatorFetch, handleNicknameFetch }}
    >
      {state.loading && <LoadingAlert>{common.genericLoading}</LoadingAlert>}
      {children}
    </AuctionsContext.Provider>
  )
}

export const useAuctions = (): AuctionsContextValues =>
  useContext(AuctionsContext)
