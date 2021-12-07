import { OutfitCheck } from './types'

const CHARM_CHECK = 7
const QUEST_CHECK = 26
const MOUNT_CHECK = 35
const STORE_CHECK = 4
const rareMounts = new Set<string>([
  'Rift Runner',
  'Phantasmal Jade',
  'Singeing Steed',
  'Neon Sparkid',
  'Vortexion',
  'Phant',
  'Antelope',
])

const outfitChecks: Record<string, OutfitCheck> = {
  Mage: {
    test: ({ type }, characterObject) => !characterObject.sex && type >= 2,
    tag: "Ferumbras' Hat",
  },
  Summoner: {
    test: ({ type }, characterObject) => characterObject.sex && type >= 2,
    tag: "Ferumbras' Hat",
  },
  Elementalist: {
    tag: 'Elementalist addons',
    test: ({ type }) => type > 0,
  },
  'Golden Outfit': {
    tag: 'Golden Outfit',
    test: () => true,
  },
  Revenant: {
    tag: 'Revenant addons',
    test: ({ type }) => type > 0,
  },
}

export const getCharacterTags = (character: CharacterObject): string[] => {
  const { charms, quests, mounts, outfits, storeMounts, storeOutfits } =
    character

  const tags: string[] = []

  if (charms.length >= CHARM_CHECK) tags.push('manyCharms')
  if (quests.length >= QUEST_CHECK) tags.push('manyQuests')
  if (mounts.length >= MOUNT_CHECK) tags.push('manyMounts')
  if (storeOutfits.length + storeMounts.length >= STORE_CHECK) {
    tags.push('manyStoryCosmetics')
  }

  mounts.forEach((mount) => {
    if (rareMounts.has(mount)) tags.push(mount)
  })

  outfits.forEach((outfit) => {
    const check = outfitChecks[outfit.name]
    if (check?.test(outfit, character)) tags.push(check.tag)
  })

  return tags
}
