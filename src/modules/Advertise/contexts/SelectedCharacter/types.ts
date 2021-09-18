import { Dispatch, SetStateAction, ReactNode } from 'react'

export interface SelectedCharacterContextState {
  selectedCharacter: CharacterObject | undefined
  setCharacter: Dispatch<SetStateAction<CharacterObject | undefined>>
}

export interface SelectedCharacterProviderProps {
  children?: ReactNode
}
