import { HTMLAttributes } from 'react'

export interface FavButtonProps {
  characterObject: CharacterObject
  props?: HTMLAttributes<HTMLDivElement>
}

export interface FavButtonStyleProps {
  active?: boolean
}
