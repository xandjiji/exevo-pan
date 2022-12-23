import { dictionary } from 'data-dictionary/dist/dictionaries/characterTags'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { constTokens as achievementTokens } from 'data-dictionary/dist/dictionaries/rareAchievement'

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
  'Ripptor',
])

type RareOutfitTestParams = {
  sex: boolean
} & Outfit

export const testRareOutfit = (params: RareOutfitTestParams): boolean => {
  const rareOutfitTests: Array<typeof testRareOutfit> = [
    ({ name, type, sex }) => name === 'Mage' && !sex && type >= 2,
    ({ name, type, sex }) => name === 'Summoner' && sex && type >= 2,
    ({ name, type }) => name === 'Elementalist' && type > 0,
    ({ name, type }) => name === 'Revenant' && type > 0,
    ({ name, type }) => name === 'Battle Mage' && type > 0,
    ({ name, type }) => name === 'Demon Outfit' && type >= 2,
    ({ name, type }) => name === 'Fire-Fighter' && (type === 1 || type === 3),
    ({ name }) => name === 'Golden Outfit',
    ({ name }) => name === 'Makeshift Warrior',
    ({ name }) => name === 'Royal Costume',
    ({ name }) => name === 'Falconer',
  ]

  return rareOutfitTests.some((test) => test(params))
}

const knightSkills: Array<keyof CharacterSkillsObject> = [
  'axe',
  'club',
  'sword',
]

const HIGH_SKILL_VALUE = 100

type Tag = keyof typeof dictionary

const UPDATE_TIMESTAMP = {
  soulwar: +new Date('July 13, 2020') / 1000,
  primalOrdeal: +new Date('July 18, 2022') / 1000,
}

const wasBeforeUpdate = (
  update: keyof typeof UPDATE_TIMESTAMP,
  timestamp: number,
): boolean => timestamp <= UPDATE_TIMESTAMP[update]

export const getCharacterTags = (character: PartialCharacterObject): Tag[] => {
  const {
    charms,
    quests,
    mounts,
    outfits,
    storeMounts,
    storeOutfits,
    sex,
    auctionEnd,
  } = character

  const tags: Tag[] = []

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

  if (
    vocation.getVocationName(character.vocationId) === 'Knight' &&
    knightSkills.filter((skill) => character.skills[skill] >= HIGH_SKILL_VALUE)
      .length >= 2
  ) {
    tags.push('secondaryEkSkill')
  }

  if (character.level >= 400) {
    if (
      !character.outfits.some(({ name }) => name === 'Revenant') &&
      !wasBeforeUpdate('soulwar', auctionEnd)
    ) {
      tags.push('soulwarAvailable')
    }
    if (
      !character.rareAchievements.some(
        (achievement) => achievement === achievementTokens['Royalty of Hazard'],
      ) &&
      !wasBeforeUpdate('primalOrdeal', auctionEnd)
    ) {
      tags.push('primalAvailable')
    }
  }

  return tags
}
