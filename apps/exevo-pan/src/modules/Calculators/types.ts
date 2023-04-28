import { NavItem } from 'templates/SubHeader/types'

export type { TypedOption } from 'components/Organisms/ChipGroup/types'

export type CalculatorRoute = {
  hero: string
  sprite: string
} & NavItem

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer'

export type Skill = 'magic' | 'melee' | 'distance'
