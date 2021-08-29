import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from 'react'
import { useRouter } from 'next/router'
import { ManageDataClient } from 'services'
import { useIsMounted } from 'hooks'
import { LoadingAlert } from 'components/Atoms'
import { routes } from 'Constants'
import DatabaseReducer from './DatabaseReducer'
import LoadingReducer from './LoadingReducer'
import { buildCharacterData } from './utils'
import {
  DatabaseContextValues,
  CharactersContextValues,
  DrawerFieldsContextValues,
  WarStatisticsDataContextValues,
  DatabaseDispatchContextValues,
} from './types'

const defaultDatabaseState: DatabaseContextValues = {
  loading: false,
  characterData: [],
  serverData: [],
  rareItemData: {},
  historyData: [],
  warStatisticsData: null,
  dispatch: () => {},
}
const DatabaseContext =
  createContext<DatabaseContextValues>(defaultDatabaseState)

const CharactersContext = createContext<CharactersContextValues>({
  loading: defaultDatabaseState.loading,
  characterData: defaultDatabaseState.characterData,
  historyData: defaultDatabaseState.historyData,
})

const DrawerFieldsContext = createContext<DrawerFieldsContextValues>({
  loading: defaultDatabaseState.loading,
  serverData: defaultDatabaseState.serverData,
  rareItemData: defaultDatabaseState.rareItemData,
})

const WarStatisticsDataContext = createContext<WarStatisticsDataContextValues>({
  loading: defaultDatabaseState.loading,
  warStatisticsData: defaultDatabaseState.warStatisticsData,
})

const DatabaseDispatchContext = createContext<DatabaseDispatchContextValues>({
  dispatch: defaultDatabaseState.dispatch,
})

export const DatabaseProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [
    { characterData, serverData, rareItemData, historyData, warStatisticsData },
    dispatch,
  ] = useReducer(DatabaseReducer, {
    baseCharacterData: defaultDatabaseState.characterData,
    characterData: defaultDatabaseState.characterData,
    serverData: defaultDatabaseState.serverData,
    rareItemData: defaultDatabaseState.rareItemData,
    baseHistoryData: defaultDatabaseState.historyData,
    historyData: defaultDatabaseState.historyData,
    warStatisticsData: defaultDatabaseState.warStatisticsData,
  })

  const [{ loadingPaths, navigated }, dispatchLoad] = useReducer(
    LoadingReducer,
    {
      loadingPaths: [],
      navigated: [],
    },
  )

  const { pathname } = useRouter()
  const loading = loadingPaths.includes(pathname)

  const [loadedPercentage, setLoadedPercentage] = useState<string | null>()
  const fetchCharacterData = useCallback(async (currentPath: string) => {
    const isHistory = currentPath === routes.BAZAAR_HISTORY
    setLoadedPercentage(null)

    try {
      const [freshCharacterData, freshServerArray, freshItemData] =
        await Promise.all([
          isHistory
            ? ManageDataClient.fetchHistoryData(setLoadedPercentage)
            : ManageDataClient.fetchCharacterData(),
          ManageDataClient.fetchServerData(),
          ManageDataClient.fetchItemData(),
        ])

      dispatch({
        type: 'INITIAL_DATA_LOAD',
        characterData: buildCharacterData(freshCharacterData, freshServerArray),
        serverData: freshServerArray,
        rareItemData: freshItemData,
        isHistory,
      })
    } finally {
      setLoadedPercentage(null)
      dispatchLoad({ type: 'FINISH_LOADING', paths: [currentPath] })
    }
  }, [])

  const fetchWarStatisticsData = useCallback(async () => {
    try {
      const warData = await ManageDataClient.fetchWarStatisticsData()

      dispatch({
        type: 'WAR_STATISTICS_DATA_LOAD',
        warStatisticsData: warData,
      })
    } finally {
      dispatchLoad({
        type: 'FINISH_LOADING',
        paths: [routes.LIBERTABRA_WAR, routes.LIBERTABRA_WAR_TOP_10],
      })
    }
  }, [])

  useEffect(() => {
    if (pathname === routes.HOME || pathname === routes.BAZAAR_HISTORY) {
      if (!navigated.includes(pathname)) {
        dispatchLoad({ type: 'START_LOADING', paths: [pathname] })
        fetchCharacterData(pathname)
      }
    }
    if (
      pathname === routes.LIBERTABRA_WAR ||
      pathname === routes.LIBERTABRA_WAR_TOP_10
    ) {
      if (!navigated.includes(pathname)) {
        dispatchLoad({
          type: 'START_LOADING',
          paths: [routes.LIBERTABRA_WAR, routes.LIBERTABRA_WAR_TOP_10],
        })
        fetchWarStatisticsData()
      }
    }
  }, [pathname, navigated, fetchCharacterData])

  const isMounted = useIsMounted()
  useEffect(() => {
    if (pathname === routes.HOME || pathname === routes.BAZAAR_HISTORY) {
      if (isMounted) dispatch({ type: 'RESET_TO_BASE_DATA' })
    }
  }, [pathname, navigated, fetchCharacterData])

  const drawerFields = useMemo(
    () => ({
      serverData,
      rareItemData,
    }),
    [serverData, rareItemData],
  )

  return (
    /* @ ToDo: remove DatabaseContext */
    <DatabaseContext.Provider
      value={{
        loading,
        characterData,
        serverData,
        rareItemData,
        historyData,
        warStatisticsData,
        dispatch,
      }}
    >
      <CharactersContext.Provider
        value={{ loading, characterData, historyData }}
      >
        <DrawerFieldsContext.Provider value={{ ...drawerFields, loading }}>
          <WarStatisticsDataContext.Provider
            value={{ warStatisticsData, loading }}
          >
            <DatabaseDispatchContext.Provider value={{ dispatch }}>
              {loading && (
                <LoadingAlert>Updating data... {loadedPercentage}</LoadingAlert>
              )}
              {children}
            </DatabaseDispatchContext.Provider>
          </WarStatisticsDataContext.Provider>
        </DrawerFieldsContext.Provider>
      </CharactersContext.Provider>
    </DatabaseContext.Provider>
  )
}

export const useDatabase = (): DatabaseContextValues =>
  useContext(DatabaseContext)

export const useCharacters = (): CharactersContextValues =>
  useContext(CharactersContext)

export const useDrawerFields = (): DrawerFieldsContextValues =>
  useContext(DrawerFieldsContext)

export const useWarStatisticsData = (): WarStatisticsDataContextValues =>
  useContext(WarStatisticsDataContext)

export const useDatabaseDispatch = (): DatabaseDispatchContextValues =>
  useContext(DatabaseDispatchContext)
