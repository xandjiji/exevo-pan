import * as CONSTANTS from '../constants'
import {
  SkillToPointsArgs,
  PointsToAdvanceArgs,
  RequiredSkillPointsArgs,
} from './types'

const SKILL_CONSTANT = CONSTANTS.SKILLS.magic

const skillToPoints = ({
  skillValue,
  vocation,
  skill,
}: SkillToPointsArgs): number => {
  const vocationConstant = CONSTANTS.VOCATION[vocation][skill]

  const numerator = vocationConstant ** skillValue - 1
  const denominator = vocationConstant - 1

  return SKILL_CONSTANT * (numerator / denominator)
}

const pointsToAdvance = ({
  skillValue,
  vocation,
  skill,
}: PointsToAdvanceArgs): number => {
  const vocationConstant = CONSTANTS.VOCATION[vocation][skill]
  return SKILL_CONSTANT * vocationConstant ** skillValue
}

export const requiredSkillPoints = ({
  currentSkill,
  targetSkill,
  percentageLeft,
  loyaltyBonus,
  ...args
}: RequiredSkillPointsArgs): number => {
  const currentPoints = skillToPoints({ skillValue: currentSkill, ...args })
  const targetPoints = skillToPoints({ skillValue: targetSkill, ...args })
  const currentCompletedPercentage = percentageLeft / 100

  const requiredPoints = targetPoints - currentPoints

  let totalRequiredPointsPoints = 0
  if (targetSkill - currentSkill === 1) {
    totalRequiredPointsPoints = requiredPoints * currentCompletedPercentage
  } else {
    const pointsToNext = pointsToAdvance({ skillValue: currentSkill, ...args })
    totalRequiredPointsPoints =
      requiredPoints - pointsToNext * (1 - currentCompletedPercentage)
  }

  return totalRequiredPointsPoints / (1 + loyaltyBonus / 100)
}
