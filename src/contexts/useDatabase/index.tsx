import { createContext, useContext, useReducer, useEffect } from 'react'
import { ManageDataClient } from 'services'
import DatabaseDataReducer from './reducer'
import { buildCharacterData } from './utils'
import { DatabaseContextValues } from './types'

const defaultDatabaseState: DatabaseContextValues = {
  loading: true,
  characterData: [],
  serverData: [],
  dispatch: () => {},
}
const DatabaseContext =
  createContext<DatabaseContextValues>(defaultDatabaseState)

export const DatabaseProvider: React.FC = ({ children }) => {
  const [{ loading, characterData, serverData }, dispatch] = useReducer(
    DatabaseDataReducer,
    {
      loading: defaultDatabaseState.loading,
      baseCharacterData: defaultDatabaseState.characterData,
      characterData: defaultDatabaseState.characterData,
      serverData: defaultDatabaseState.serverData,
    },
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [freshCharacterData, freshServerArray] = await Promise.all([
          ManageDataClient.fetchCharacterData(),
          ManageDataClient.fetchServerData(),
        ])

        const buildedCharacterData = buildCharacterData(
          freshCharacterData,
          freshServerArray,
        )

        dispatch({
          type: 'INITIAL_DATA_LOAD',
          characterData: buildedCharacterData,
          serverData: freshServerArray,
        })
      } finally {
        dispatch({ type: 'SET_LOADED' })
      }
    }
    fetchData()
  }, [])

  return (
    <DatabaseContext.Provider
      value={{
        loading,
        characterData,
        serverData,
        dispatch,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export const useDatabase = (): DatabaseContextValues =>
  useContext(DatabaseContext)
