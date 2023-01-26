import { CharacterCardProps } from 'components/CharacterCard/types'

export type ExpandableCharacterCardProps = {
  highlightedAuctions: CharacterObject[]
  forceNoHighlight?: boolean
} & Omit<CharacterCardProps, 'ref' | 'highlighted'>
