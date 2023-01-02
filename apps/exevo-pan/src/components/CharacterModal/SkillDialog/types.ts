import { TypedOption } from 'components/Organisms/ChipGroup/types'

export type SkillDialogProps = {
  vocationId: number
  skills: CharacterSkillsObject
  isOpen: boolean
  onClose: () => void
}

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer'

export type Skill = 'magic' | 'distance' | 'club' | 'axe' | 'sword'

export type SkillType = 'magic' | 'melee' | 'distance'

export type SkillOptions = TypedOption<Skill>
