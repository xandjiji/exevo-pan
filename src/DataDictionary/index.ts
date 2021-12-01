/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  characterObject,
  skills,
  charm,
  imbuement,
  quest,
  outfit,
  mount,
  rareAchievement,
} from './dictionaries'

export const minifiedToObject = (
  minifiedCharacterData: MinifiedCharacterObject,
): PartialCharacterObject => {
  const charObject = {} as PartialCharacterObject
  for (const [index, item] of minifiedCharacterData.entries()) {
    charObject[characterObject.dictionary[index]] = item
  }

  const skillObject = {}
  for (const [index, item] of charObject.skills.entries()) {
    skillObject[skills.dictionary[index]] = item
  }
  charObject.skills = skillObject

  charObject.charms = charObject.charms.map((item) => charm.dictionary[item])

  charObject.imbuements = charObject.imbuements.map(
    (item) => imbuement.dictionary[item],
  )

  charObject.quests = charObject.quests.map((item) => quest.dictionary[item])

  charObject.outfits = charObject.outfits.map((item) => outfit.dictionary[item])

  charObject.mounts = charObject.mounts.map((item) => mount.dictionary[item])

  charObject.rareAchievements = charObject.rareAchievements.map(
    (item) => rareAchievement.dictionary[item],
  )

  return { ...charObject }
}
