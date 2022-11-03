import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import {
  getHighestSkill,
  SKILL_CONSTANTS,
  requiredSkillPoints,
  customRequiredWeaponsCount,
  skillCost,
} from 'utils'
import { Skill, Vocation, SkillType } from './types'

const skillOptions: Array<keyof CharacterSkillsObject> = [
  'axe',
  'club',
  'sword',
  'magic',
  'distance',
]

export const getInitialSkill = (skills: CharacterSkillsObject): Skill => {
  const { skill: highestSkill } = getHighestSkill(skills)

  return skillOptions.includes(highestSkill) ? (highestSkill as Skill) : 'magic'
}

export const getVocationName = (vocationId: number) =>
  vocation.getVocationName(vocationId).toLowerCase() as Vocation

export const getSkillType = (skill: Skill): SkillType =>
  ['magic', 'distance'].includes(skill) ? (skill as 'magic') : 'melee'

export const getPercentageLeft = (value: number) => {
  const [, decimal] = value.toFixed(2).split('.')
  return 100 - Number(decimal ?? 0)
}

export const calculateMinimumSkillCost = (
  ...args: Parameters<typeof requiredSkillPoints>
): ReturnType<typeof skillCost> =>
  skillCost(
    customRequiredWeaponsCount(
      requiredSkillPoints(...args) /
        SKILL_CONSTANTS.DIVIDER.hasDummy /
        SKILL_CONSTANTS.DIVIDER.isDouble,
      'regular',
    ),
  )
