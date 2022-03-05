import { RareOutfitTestParams, RareOutfitTest } from './types'

const rareOutfitTests: RareOutfitTest[] = [
  ({ name, type, sex }) => name === 'Mage' && !sex && type >= 2,
  ({ name, type, sex }) => name === 'Summoner' && sex && type >= 2,
  ({ name, type }) => name === 'Elementalist' && type > 0,
  ({ name, type }) => name === 'Revenant' && type > 0,
  ({ name }) => name === 'Golden Outfit',
]

export const testRareOutfit = (params: RareOutfitTestParams): boolean =>
  rareOutfitTests.some((test) => test(params))
