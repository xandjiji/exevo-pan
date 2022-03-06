export interface SpriteBoxProps {
  offset?: boolean
  sex: boolean
  name: string
  src: string
  type?: number
  amount?: number
  checkRareOutfit?: boolean
  checkRareMount?: boolean
}

export type RareOutfitTestParams = {
  sex: boolean
} & Outfit

export type RareOutfitTest = (params: RareOutfitTestParams) => boolean
