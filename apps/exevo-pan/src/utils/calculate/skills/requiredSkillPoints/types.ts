import { Skill, Vocation } from '../types'

export type SkillToPointsArgs = {
  skill: Skill
  vocation: Vocation
  skillValue: number
}

export type PointsToAdvanceArgs = {
  skill: Skill
  vocation: Vocation
  skillValue: number
}

export type RequiredSkillPointsArgs = {
  skill: Skill
  vocation: Vocation
  currentSkill: number
  targetSkill: number
  percentageLeft: number
  loyaltyBonus: number
}
