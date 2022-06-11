export type TypedOption<T> = {
  value: T
} & Pick<Option, 'name'>

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer'

export type Skill = 'magic' | 'melee' | 'distance'

export type TotalPointsArgs = {
  currentSkill: number
  skillConstant: number
  vocationConstant: number
  skillOffset: number
}
