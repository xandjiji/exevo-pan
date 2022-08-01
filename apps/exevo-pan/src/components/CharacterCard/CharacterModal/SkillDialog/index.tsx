import { useState } from 'react'
import { Dialog } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import { useStoredState } from 'hooks'
import { getInitialSkill } from './utils'
import { skillOptions } from './options'
import { SkillDialogProps, Skill } from './types'

/* @ ToDo:

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
  const [skill, setSkill] = useState<Skill>(() => getInitialSkill(skills))

  return (
    <Dialog {...dialogProps}>
      <ChipGroup label="Skill" options={skillOptions} value={skill} />
    </Dialog>
  )
}

export default SkillDialog
