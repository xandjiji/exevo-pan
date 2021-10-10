import { HTMLAttributes } from 'react'

export interface CharacterCardProps extends HTMLAttributes<HTMLDivElement> {
  characterData: CharacterObject
  highlighted?: boolean
}

export interface BattleyeStatusStyleProps {
  active: boolean
}
