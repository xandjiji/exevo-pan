export interface SpecialTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  character: CharacterObject
}

export type OutfitCheck = {
  tag: string
  test: (outfit: Outfit, character: CharacterObject) => boolean
}
