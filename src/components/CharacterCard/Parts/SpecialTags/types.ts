export interface SpecialTagsProps {
  character: CharacterObject
}

export type OutfitCheck = {
  tag: string
  test: (outfit: Outfit) => boolean
}
