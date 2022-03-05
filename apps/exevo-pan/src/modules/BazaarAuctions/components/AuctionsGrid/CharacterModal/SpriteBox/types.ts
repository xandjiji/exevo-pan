export interface SpriteBoxProps {
  offset?: boolean
  sex: boolean
  name: string
  src: string
  rareSet?: Set<string>
  type?: number
  checkRareOutfit?: boolean
}

export type RareOutfitTestParams = {
  sex: boolean
} & Outfit

export type RareOutfitTest = (params: RareOutfitTestParams) => boolean
