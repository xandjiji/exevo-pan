import { memoize } from 'utils'
import { RareOutfitTestParams, RareOutfitTest } from './types'

const CHARM_CHECK = 7
const QUEST_CHECK = 26
const MOUNT_CHECK = 35
const STORE_CHECK = 4
export const rareMountSet = new Set<string>([
  'Rift Runner',
  'Phantasmal Jade',
  'Singeing Steed',
  'Neon Sparkid',
  'Vortexion',
  'Phant',
  'Antelope',
  'Fleeting Knowledge',
])

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

export const getCharacterTags = (character: CharacterObject): string[] => {
  const { charms, quests, mounts, outfits, storeMounts, storeOutfits, sex } =
    character

  const tags: string[] = []

  if (charms.length >= CHARM_CHECK) tags.push('manyCharms')
  if (quests.length >= QUEST_CHECK) tags.push('manyQuests')
  if (mounts.length >= MOUNT_CHECK) tags.push('manyMounts')
  if (storeOutfits.length + storeMounts.length >= STORE_CHECK) {
    tags.push('manyStoreCosmetics')
  }

  if (mounts.some((mount) => rareMountSet.has(mount))) {
    tags.push('rareMounts')
  }

  if (outfits.some((outfit) => testRareOutfit({ ...outfit, sex }))) {
    tags.push('rareOutfits')
  }

  return tags
}
