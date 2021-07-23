import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from 'react'
import { useLocation } from 'react-router-dom'
import { ManageDataClient } from 'services'
import { LoadingAlert } from 'components/Atoms'
import DatabaseReducer from './DatabaseReducer'
import LoadingReducer from './LoadingReducer'
import { buildCharacterData } from './utils'
import {
  DatabaseContextValues,
  CharactersContextValues,
  DrawerFieldsContextValues,
  DatabaseDispatchContextValues,
} from './types'

const defaultDatabaseState: DatabaseContextValues = {
  loading: false,
  characterData: [],
  serverData: [],
  rareItemData: {},
  historyData: [],
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

const DatabaseDispatchContext = createContext<DatabaseDispatchContextValues>({
  dispatch: defaultDatabaseState.dispatch,
})

export const DatabaseProvider: React.FC = ({ children }) => {
  const [{ characterData, serverData, rareItemData, historyData }, dispatch] =
    useReducer(DatabaseReducer, {
      baseCharacterData: defaultDatabaseState.characterData,
      characterData: defaultDatabaseState.characterData,
      serverData: defaultDatabaseState.serverData,
      rareItemData: defaultDatabaseState.rareItemData,
      baseHistoryData: defaultDatabaseState.historyData,
      historyData: defaultDatabaseState.historyData,
    })

  const [{ loadingPaths, navigated }, dispatchLoad] = useReducer(
    LoadingReducer,
    {
      loadingPaths: [],
      navigated: [],
    },
  )

  const { pathname } = useLocation()
  const loading = loadingPaths.includes(pathname)

  const [loadedPercentage, setLoadedPercentage] = useState<string | null>()
  const fetchCharacterData = useCallback(async (currentPath: string) => {
    const isHistory = currentPath === '/bazaar-history'
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
      dispatchLoad({ type: 'FINISH_LOADING', path: currentPath })
    }
  }, [])

  useEffect(() => {
    if (pathname === '/' || pathname === '/bazaar-history') {
      if (!navigated.includes(pathname)) {
        dispatchLoad({ type: 'START_LOADING', path: pathname })
        fetchCharacterData(pathname)
      }
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
        dispatch,
      }}
    >
      <CharactersContext.Provider
        value={{ loading, characterData, historyData }}
      >
        <DrawerFieldsContext.Provider value={{ ...drawerFields, loading }}>
          <DatabaseDispatchContext.Provider value={{ dispatch }}>
            {loading && (
              <LoadingAlert>Updating data... {loadedPercentage}</LoadingAlert>
            )}
            {children}
          </DatabaseDispatchContext.Provider>
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

export const useDatabaseDispatch = (): DatabaseDispatchContextValues =>
  useContext(DatabaseDispatchContext)
