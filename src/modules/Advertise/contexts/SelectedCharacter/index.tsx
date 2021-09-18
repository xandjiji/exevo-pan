import { createContext, useContext, useState } from 'react'
import {
  SelectedCharacterContextState,
  SelectedCharacterProviderProps,
} from './types'

const defaultState: SelectedCharacterContextState = {
  selectedCharacter: undefined,
  setCharacter: () => null,
}

const SelectedCharacterContext =
  createContext<SelectedCharacterContextState>(defaultState)

export const SelectedCharacterProvider = ({
  children,
}: SelectedCharacterProviderProps): JSX.Element => {
  const [selectedCharacter, setCharacter] = useState<
    CharacterObject | undefined
  >()

  return (
    <SelectedCharacterContext.Provider
      value={{ selectedCharacter, setCharacter }}
    >
      {children}
    </SelectedCharacterContext.Provider>
  )
}

export const useSelectedCharacter = (): SelectedCharacterContextState =>
  useContext(SelectedCharacterContext)
