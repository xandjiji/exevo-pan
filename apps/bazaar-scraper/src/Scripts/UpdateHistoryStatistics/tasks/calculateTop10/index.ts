import { getTop10ByAttribute, top10BySkillFactory } from './utils'

export const byBid = (history: PartialCharacterObject[]): CharacterInfo[] =>
  getTop10ByAttribute('currentBid', history).map(
    ({ id, nickname, currentBid }) => ({ id, nickname, currentBid }),
  )

export const byLevel = (history: PartialCharacterObject[]): CharacterInfo[] =>
  getTop10ByAttribute('level', history).map(
    ({ id, nickname, currentBid, level }) => ({
      id,
      nickname,
      currentBid,
      level,
    }),
  )

export const byMagic = (history: PartialCharacterObject[]): CharacterInfo[] =>
  top10BySkillFactory('magic', history)

export const byClub = (history: PartialCharacterObject[]): CharacterInfo[] =>
  top10BySkillFactory('club', history)

export const byFist = (history: PartialCharacterObject[]): CharacterInfo[] =>
  top10BySkillFactory('fist', history)

export const bySword = (history: PartialCharacterObject[]): CharacterInfo[] =>
  top10BySkillFactory('sword', history)

export const byFishing = (history: PartialCharacterObject[]): CharacterInfo[] =>
  top10BySkillFactory('fishing', history)

export const byAxe = (history: PartialCharacterObject[]): CharacterInfo[] =>
  top10BySkillFactory('axe', history)

export const byDistance = (
  history: PartialCharacterObject[],
): CharacterInfo[] => top10BySkillFactory('distance', history)

export const byShielding = (
  history: PartialCharacterObject[],
): CharacterInfo[] => top10BySkillFactory('shielding', history)
