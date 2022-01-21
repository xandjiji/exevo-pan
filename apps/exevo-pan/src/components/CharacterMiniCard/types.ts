export interface CharacterMiniCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isCard?: boolean
  displayLink?: boolean
  displayServer?: boolean
  outfitSrc?: string
  characterData: SingleCharacterData
  forceSubtitle?: string
}
