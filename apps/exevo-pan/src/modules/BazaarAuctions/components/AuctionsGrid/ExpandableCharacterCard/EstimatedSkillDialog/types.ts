import { TypedOption } from 'components/Organisms/ChipGroup/types'

export type EstimatedSkillDialogProps = {
  vocationId: number
  skills: CharacterSkillsObject
  onClose: () => void
}

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer'

export type Skill = 'magic' | 'distance' | 'club' | 'axe' | 'sword'

export type SkillType = 'magic' | 'melee' | 'distance'

export type SkillOptions = TypedOption<Skill>
