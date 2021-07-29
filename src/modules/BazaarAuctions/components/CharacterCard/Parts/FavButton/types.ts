import { HTMLAttributes } from 'react'

export interface FavButtonProps extends HTMLAttributes<HTMLButtonElement> {
  characterObject: CharacterObject
}

export interface FavButtonStyleProps {
  active?: boolean
}
