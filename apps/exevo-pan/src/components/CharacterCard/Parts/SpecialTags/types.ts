export interface SpecialTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  character: CharacterObject
}

export type RareOutfitTestParams = {
  sex: boolean
} & Outfit

export type RareOutfitTest = (params: RareOutfitTestParams) => boolean
