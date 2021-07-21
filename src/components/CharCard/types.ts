import { HTMLAttributes } from 'react'

export interface CharCardProps extends HTMLAttributes<HTMLDivElement> {
  characterData: CharacterObject
}

export interface BattleyeStatusStyleProps {
  active: boolean
}
