import { useTranslations } from 'contexts/useTranslation'
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
  WarGuildDataContextValues,
  DatabaseDispatchContextValues,
} from './types'

const defaultDatabaseState: DatabaseContextValues = {
  loading: false,
  characterData: [],
  serverData: [],
  rareItemData: {},
  historyData: [],
  warGuildData: [],
  dispatch: () => {},
}
const DatabaseContext =
  createContext<DatabaseContextValues>(defaultDatabaseState)

const CharactersContext = createContext<CharactersContextValues>({
  loading: defaultDatabaseState.loading,
  characterData: defaultDatabaseState.characterData,
  historyData: defaultDatabaseState.historyData,
  baseCharacterData: defaultDatabaseState.characterData,
  baseHistoryData: defaultDatabaseState.historyData,
})

const DrawerFieldsContext = createContext<DrawerFieldsContextValues>({
  loading: defaultDatabaseState.loading,
  serverData: defaultDatabaseState.serverData,
  rareItemData: defaultDatabaseState.rareItemData,
})

const WarGuildDataContext = createContext<WarGuildDataContextValues>({
  loading: defaultDatabaseState.loading,
  warGuildData: defaultDatabaseState.warGuildData,
})

const DatabaseDispatchContext = createContext<DatabaseDispatchContextValues>({
  dispatch: defaultDatabaseState.dispatch,
})

export const DatabaseProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [
    {
      characterData,
      serverData,
      rareItemData,
      historyData,
      warGuildData,
      baseCharacterData,
      baseHistoryData,
    },
    dispatch,
  ] = useReducer(DatabaseReducer, {
    baseCharacterData: defaultDatabaseState.characterData,
    characterData: defaultDatabaseState.characterData,
    serverData: defaultDatabaseState.serverData,
    rareItemData: defaultDatabaseState.rareItemData,
    baseHistoryData: defaultDatabaseState.historyData,
    historyData: defaultDatabaseState.historyData,
    warGuildData: defaultDatabaseState.warGuildData,
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
      dispatchLoad({
        type: 'FINISH_LOADING',
        paths: [isHistory ? currentPath : routes.HOME, routes.ADVERTISE],
      })
    }
  }, [])

  const fetchGuildWarData = useCallback(async () => {
    try {
      const [miniGuildDataA, miniGuildDataB] = await Promise.all([
        ManageDataClient.fetchGuildWarData('Libertabra Pune'),
        ManageDataClient.fetchGuildWarData('Bones Alliance'),
      ])

      const allGuildMembers = [...miniGuildDataA, ...miniGuildDataB].sort(
        (a, b) => b.level - a.level,
      )

      dispatch({
        type: 'WAR_GUILD_DATA_LOAD',
        warGuildData: allGuildMembers,
      })
    } finally {
      dispatchLoad({
        type: 'FINISH_LOADING',
        paths: [routes.LIBERTABRA_WAR_SEARCH],
      })
    }
  }, [])

  useEffect(() => {
    if (
      pathname === routes.HOME ||
      pathname === routes.BAZAAR_HISTORY ||
      pathname === routes.ADVERTISE
    ) {
      if (!navigated.includes(pathname)) {
        const isHistory = pathname === routes.BAZAAR_HISTORY

        if (isHistory) {
          dispatchLoad({ type: 'START_LOADING', paths: [pathname] })
        } else {
          dispatchLoad({
            type: 'START_LOADING',
            paths: [routes.HOME, routes.ADVERTISE],
          })
        }
        fetchCharacterData(pathname)
      }
    }
    if (pathname === routes.LIBERTABRA_WAR_SEARCH) {
      if (!navigated.includes(pathname)) {
        dispatchLoad({
          type: 'START_LOADING',
          paths: [routes.LIBERTABRA_WAR_SEARCH],
        })
        fetchGuildWarData()
      }
    }
  }, [pathname, navigated, fetchCharacterData, fetchGuildWarData])

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
        warGuildData,
        dispatch,
      }}
    >
      <CharactersContext.Provider
        value={{
          loading,
          characterData,
          historyData,
          baseCharacterData,
          baseHistoryData,
        }}
      >
        <DrawerFieldsContext.Provider value={{ ...drawerFields, loading }}>
          <WarGuildDataContext.Provider value={{ warGuildData, loading }}>
            <DatabaseDispatchContext.Provider value={{ dispatch }}>
              {loading && (
                <LoadingAlert>
                  {common.UpdatingDataText} {loadedPercentage}
                </LoadingAlert>
              )}
              {children}
            </DatabaseDispatchContext.Provider>
          </WarGuildDataContext.Provider>
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

export const useWarGuildData = (): WarGuildDataContextValues =>
  useContext(WarGuildDataContext)

export const useDatabaseDispatch = (): DatabaseDispatchContextValues =>
  useContext(DatabaseDispatchContext)
