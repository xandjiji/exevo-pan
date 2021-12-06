import { OutfitCheck } from './types'

const CHARM_CHECK = 7
const QUEST_CHECK = 26
const MOUNT_CHECK = 35
const STORE_CHECK = 5
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
    test: ({ type }) => type >= 2,
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

export const getCharacterTags = ({
  charms,
  quests,
  mounts,
  outfits,
  storeMounts,
  storeOutfits,
}: CharacterObject): string[] => {
  const tags: string[] = []

  if (charms.length >= CHARM_CHECK) tags.push('lotsOfCharms')
  if (quests.length >= QUEST_CHECK) tags.push('lotsOfQuests')
  if (mounts.length >= MOUNT_CHECK) tags.push('lotsOfMounts')
  if (storeOutfits.length + storeMounts.length >= STORE_CHECK) {
    tags.push('lotsOfStoreContent')
  }

  mounts.forEach((mount) => {
    if (rareMounts.has(mount)) tags.push(mount)
  })

  outfits.forEach((outfit) => {
    const check = outfitChecks[outfit.name]
    if (check?.test(outfit)) tags.push(check.tag)
  })

  return tags
}
