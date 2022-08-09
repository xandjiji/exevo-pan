export type { TypedOption } from 'components/Organisms/ChipGroup/types'

export type CharacterConfigProps = {
  updatePointsRequired: (points: number) => void
}

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer'

export type Skill = 'magic' | 'melee' | 'distance'
