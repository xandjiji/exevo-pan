import * as CONSTANTS from '../constants'
import {
  SkillToPointsArgs,
  PointsToSkillArgs,
  Skill,
  SkillAfterLoyalty,
} from './types'

const log = (base: number, value: number): number =>
  Math.log(value) / Math.log(base)

const getSkillOffset = (skill: Skill): number => (skill === 'magic' ? 0 : 10)

const skillToPoints = ({
  skillValue,
  vocation,
  skill,
}: SkillToPointsArgs): number => {
  const vocationConstant = CONSTANTS.VOCATION[vocation][skill]
  const skillConstant = CONSTANTS.SKILLS[skill]
  const skillOffset = getSkillOffset(skill)

  const numerator = vocationConstant ** (skillValue - skillOffset) - 1
  const denominator = vocationConstant - 1

  return skillConstant * (numerator / denominator)
}

const pointsToSkill = ({
  skill,
  skillPoints,
  vocation,
}: PointsToSkillArgs): number => {
  const vocationConstant = CONSTANTS.VOCATION[vocation][skill]
  const skillConstant = CONSTANTS.SKILLS[skill]
  const skillOffset = getSkillOffset(skill)

  const skillValue = log(
    vocationConstant,
    skillPoints * ((vocationConstant - 1) / skillConstant) + 1,
  )

  return skillValue + skillOffset
}

export const skillAfterLoyalty = ({
  skillValue,
  skill,
  vocation,
  loyaltyBonus,
}: SkillAfterLoyalty): number =>
  pointsToSkill({
    skill,
    skillPoints:
      skillToPoints({
        skillValue,
        skill,
        vocation,
      }) *
      (1 + loyaltyBonus / 100),
    vocation,
  })
