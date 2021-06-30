import { HTMLAttributes } from 'react'

export interface FavButtonProps extends HTMLAttributes<HTMLDivElement> {
  characterObject: CharacterObject
}

export interface FavButtonStyleProps {
  active?: boolean
}
