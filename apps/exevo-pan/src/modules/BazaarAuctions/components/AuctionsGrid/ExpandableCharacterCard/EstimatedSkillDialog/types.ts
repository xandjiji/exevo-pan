import { TypedOption } from 'components/Organisms/ChipGroup/types'

export type EstimatedSkillDialogProps = {
  vocationId: number
  skills: CharacterSkillsObject
  onClose: () => void
}

export type Vocation = 'knight' | 'paladin' | 'druid' | 'sorcerer' | 'monk'

export type Skill =
  | 'magic'
  | 'distance'
  | 'club'
  | 'axe'
  | 'sword'
  | 'shielding'
  | 'fist'

export type SkillType = 'magic' | 'melee' | 'distance'

export type SkillOptions = TypedOption<Skill>
