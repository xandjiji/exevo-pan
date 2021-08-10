import { HTMLAttributes } from 'react'

export interface CharacterCardProps extends HTMLAttributes<HTMLDivElement> {
  characterData: CharacterObject
}

export interface BattleyeStatusStyleProps {
  active: boolean
}
