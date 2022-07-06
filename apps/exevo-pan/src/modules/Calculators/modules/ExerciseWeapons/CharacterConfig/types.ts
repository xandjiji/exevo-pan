import { Option } from 'components/Organisms/ChipGroup/types'

export type CharacterConfigProps = {
  updatePointsRequired: (points: number) => void
}

export type TypedOption<T> = {
  value: T
} & Omit<Option, 'value'>

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer'

export type Skill = 'magic' | 'melee' | 'distance'

type BaseCalcArgs = {
  vocation: Vocation
  skill: Skill
}

export type SkillCalcArgs = {
  currentSkill: number
  targetSkill: number
  percentageLeft: number
  loyaltyBonus: number
} & BaseCalcArgs

export type PointsCalcArgs = {
  skillValue: number
} & BaseCalcArgs
