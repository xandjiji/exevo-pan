import { Dialog } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import { skillOptions } from './options'
import { SkillDialogProps } from './types'

/* @ ToDo:

- skill chip
    storedState
    automatically select highest

- skill minimum cost
    tooltip explaining dummy/event

- loyalty slider
    storedState
    skill with loyalty

- skill link with params (targetSkill, vocation, skill, loyalty, param)

- i18n
*/

const SkillDialog = ({
  vocationId,
  skills,
  ...dialogProps
}: SkillDialogProps) => {
  console.log(9)

  return (
    <Dialog {...dialogProps}>
      <ChipGroup label="Skill" options={skillOptions} />
    </Dialog>
  )
}

export default SkillDialog
