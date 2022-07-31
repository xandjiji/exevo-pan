import { TypedOption } from 'components/Organisms/ChipGroup/types'

export type SkillDialogProps = {
  vocationId: number
  skills: CharacterSkillsObject
  isOpen: boolean
  onClose: () => void
}

export type Skill = 'magic' | 'distance' | 'club' | 'axe' | 'sword'

export type SkillOptions = TypedOption<Skill>
