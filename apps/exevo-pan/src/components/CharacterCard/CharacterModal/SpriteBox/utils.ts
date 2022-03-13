import { memoize } from 'utils'
import { RareOutfitTestParams, RareOutfitTest } from './types'

export const addonCheck = {
  first: memoize((type: number): boolean => type === 1 || type === 3),
  second: memoize((type: number): boolean => type === 2 || type === 3),
}

const rareOutfitTests: RareOutfitTest[] = [
  ({ name, type, sex }) => name === 'Mage' && !sex && type >= 2,
  ({ name, type, sex }) => name === 'Summoner' && sex && type >= 2,
  ({ name, type }) => name === 'Elementalist' && type > 0,
  ({ name, type }) => name === 'Revenant' && type > 0,
  ({ name, type }) => name === 'Battle Mage' && type > 0,
  ({ name, type }) => name === 'Demon Outfit' && type >= 2,
  ({ name }) => name === 'Golden Outfit',
  ({ name }) => name === 'Makeshift Warrior',
  ({ name }) => name === 'Royal Costume',
]

export const testRareOutfit = memoize((params: RareOutfitTestParams): boolean =>
  rareOutfitTests.some((test) => test(params)),
)

export const rareMountSet = new Set([
  'Rift Runner',
  'Phantasmal Jade',
  'Singeing Steed',
  'Neon Sparkid',
  'Vortexion',
  'Phant',
  'Antelope',
  'Fleeting Knowledge',
])
