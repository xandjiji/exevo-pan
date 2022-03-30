import { HTMLAttributes } from 'react'

export interface CharacterCardProps extends HTMLAttributes<HTMLDivElement> {
  characterData: CharacterObject
  highlighted?: boolean
  lazyRender?: boolean
  expandable?: boolean
  past?: boolean
}
