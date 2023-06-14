import { useTranslations } from 'contexts/useTranslation'
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react'
import { useRouter } from 'next/router'
import { ManageDataClient } from 'services/client'
import { LoadingAlert } from 'components/Atoms'
import { routes } from 'Constants'
import DatabaseReducer from './DatabaseReducer'
import LoadingReducer from './LoadingReducer'
import {
  DatabaseContextValues,
  WarGuildDataContextValues,
  DatabaseDispatchContextValues,
} from './types'

const defaultDatabaseState: DatabaseContextValues = {
  loading: false,
  warGuildData: [],
  dispatch: () => {},
}
const DatabaseContext =
  createContext<DatabaseContextValues>(defaultDatabaseState)

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
  children: JSX.Element | JSX.Element[]
}) => {
  const { common } = useTranslations()

  const [{ warGuildData }, dispatch] = useReducer(DatabaseReducer, {
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
    if (pathname === routes.LIBERTABRA_WAR_SEARCH) {
      if (!navigated.includes(pathname)) {
        dispatchLoad({
          type: 'START_LOADING',
          paths: [routes.LIBERTABRA_WAR_SEARCH],
        })
        fetchGuildWarData()
      }
    }
  }, [pathname, navigated, fetchGuildWarData])

  return (
    <DatabaseContext.Provider
      value={{
        loading,
        warGuildData,
        dispatch,
      }}
    >
      <WarGuildDataContext.Provider value={{ warGuildData, loading }}>
        <DatabaseDispatchContext.Provider value={{ dispatch }}>
          {loading && <LoadingAlert>{common.UpdatingDataText}</LoadingAlert>}
          {children}
        </DatabaseDispatchContext.Provider>
      </WarGuildDataContext.Provider>
    </DatabaseContext.Provider>
  )
}

export const useDatabase = (): DatabaseContextValues =>
  useContext(DatabaseContext)

export const useWarGuildData = (): WarGuildDataContextValues =>
  useContext(WarGuildDataContext)

export const useDatabaseDispatch = (): DatabaseDispatchContextValues =>
  useContext(DatabaseDispatchContext)
