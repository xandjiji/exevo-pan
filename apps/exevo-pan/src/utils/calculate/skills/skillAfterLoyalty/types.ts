export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer' | 'monk'

export type Skill = 'magic' | 'melee' | 'distance'

export type SkillToPointsArgs = {
  skill: Skill
  vocation: Vocation
  skillValue: number
}

export type PointsToSkillArgs = {
  skill: Skill
  vocation: Vocation
  skillPoints: number
}

export type SkillAfterLoyalty = {
  skill: Skill
  vocation: Vocation
  skillValue: number
  loyaltyBonus: number
}
