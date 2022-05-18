type WithCharacterData = {
  characterData: SingleCharacterData
  displayServer?: boolean
  forceSubtitle?: string
  characterName?: never
}

type WithForcedData = {
  characterName: string
  forceSubtitle: string
  characterData?: never
  displayServer?: never
}

export type CharacterMiniCardProps = {
  isCard?: boolean
  outfitSrc?: string
  linkUrl?: string
  highlighted?: boolean
} & React.HTMLAttributes<HTMLDivElement> &
  (WithCharacterData | WithForcedData)
