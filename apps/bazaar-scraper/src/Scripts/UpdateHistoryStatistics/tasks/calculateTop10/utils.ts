import { SorteableCharacterAttribute, SkillName } from './types'

export const getTop10ByAttribute = (
  attribute: SorteableCharacterAttribute,
  history: PartialCharacterObject[],
): PartialCharacterObject[] => {
  history.sort((a, b) => b[attribute] - a[attribute])

  return history.slice(0, 10)
}

const getTop10BySkill = (
  skill: SkillName,
  history: PartialCharacterObject[],
) => {
  history.sort((a, b) => b.skills[skill] - a.skills[skill])

  return history.slice(0, 10)
}

export const top10BySkillFactory = (
  skill: SkillName,
  history: PartialCharacterObject[],
): CharacterInfo[] =>
  getTop10BySkill(skill, history).map(
    ({ id, nickname, currentBid, skills }) => ({
      id,
      nickname,
      currentBid,
      [skill]: skills[skill],
    }),
  )
