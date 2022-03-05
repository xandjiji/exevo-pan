import { RareOutfitTestParams, RareOutfitTest } from './types'

export const addonCheck = {
  first: (type: number): boolean => type === 1 || type === 3,
  second: (type: number): boolean => type === 2 || type === 3,
}

const rareOutfitTests: RareOutfitTest[] = [
  ({ name, type, sex }) => name === 'Mage' && !sex && type >= 2,
  ({ name, type, sex }) => name === 'Summoner' && sex && type >= 2,
  ({ name, type }) => name === 'Elementalist' && type > 0,
  ({ name, type }) => name === 'Revenant' && type > 0,
  ({ name }) => name === 'Golden Outfit',
]

export const testRareOutfit = (params: RareOutfitTestParams): boolean =>
  rareOutfitTests.some((test) => test(params))

export const rareMountSet = new Set([
  'Rift Runner',
  'Phantasmal Jade',
  'Singeing Steed',
  'Neon Sparkid',
  'Vortexion',
  'Phant',
  'Antelope',
])
