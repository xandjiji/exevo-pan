import { createContext, useContext, useReducer, useEffect } from 'react'
import { ManageDataClient } from 'services'
import CharacterDataReducer from './reducer'
import { CharacterDataContextValues } from './types'

const defaultCharacterDataState: CharacterDataContextValues = {
  loading: true,
  characterData: [],
  dispatch: () => {},
}
const CharacterDataContext = createContext<CharacterDataContextValues>(
  defaultCharacterDataState,
)

export const CharacterDataProvider: React.FC = ({ children }) => {
  const [{ loading, characterData }, dispatch] = useReducer(
    CharacterDataReducer,
    {
      loading: defaultCharacterDataState.loading,
      baseCharacterData: defaultCharacterDataState.characterData,
      sortedCharacterData: defaultCharacterDataState.characterData,
      characterData: defaultCharacterDataState.characterData,
    },
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverArray = await ManageDataClient.fetchCharacterData()
        dispatch({ type: 'INITIAL_DATA_LOAD', data: serverArray })
      } finally {
        dispatch({ type: 'SET_LOADED' })
      }
    }
    fetchData()
  }, [])

  return (
    <CharacterDataContext.Provider
      value={{
        loading,
        characterData,
        dispatch,
      }}
    >
      {children}
    </CharacterDataContext.Provider>
  )
}

export const useCharacterData = (): CharacterDataContextValues =>
  useContext(CharacterDataContext)
