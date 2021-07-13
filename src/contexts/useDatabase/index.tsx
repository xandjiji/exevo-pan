import { createContext, useContext, useReducer, useEffect } from 'react'
import { ManageDataClient } from 'services'
import DatabaseDataReducer from './reducer'
import { buildCharacterData } from './utils'
import { DatabaseContextValues } from './types'

const defaultDatabaseState: DatabaseContextValues = {
  loading: true,
  characterData: [],
  serverData: [],
  rareItemData: {},
  dispatch: () => {},
}
const DatabaseContext =
  createContext<DatabaseContextValues>(defaultDatabaseState)

export const DatabaseProvider: React.FC = ({ children }) => {
  const [{ loading, characterData, serverData, rareItemData }, dispatch] =
    useReducer(DatabaseDataReducer, {
      loading: defaultDatabaseState.loading,
      baseCharacterData: defaultDatabaseState.characterData,
      characterData: defaultDatabaseState.characterData,
      serverData: defaultDatabaseState.serverData,
      rareItemData: defaultDatabaseState.rareItemData,
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [freshCharacterData, freshServerArray, freshItemData] =
          await Promise.all([
            ManageDataClient.fetchCharacterData(),
            ManageDataClient.fetchServerData(),
            ManageDataClient.fetchItemData(),
          ])

        const buildedCharacterData = buildCharacterData(
          freshCharacterData,
          freshServerArray,
        )

        dispatch({
          type: 'INITIAL_DATA_LOAD',
          characterData: buildedCharacterData,
          serverData: freshServerArray,
          rareItemData: freshItemData,
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
        rareItemData,
        dispatch,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export const useDatabase = (): DatabaseContextValues =>
  useContext(DatabaseContext)
