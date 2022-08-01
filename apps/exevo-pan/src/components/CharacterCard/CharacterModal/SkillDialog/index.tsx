import { useState } from 'react'
import { Dialog } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import { useStoredState } from 'hooks'
import {
  getInitialSkill,
  calculateMinimumSkillCost,
  getVocationName,
  getSkillType,
  getPercentageLeft,
} from './utils'
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
  const selectedSkillValue = skills[skill]

  const skillCost = calculateMinimumSkillCost({
    currentSkill: 10,
    targetSkill: Math.floor(selectedSkillValue),
    loyaltyBonus: 0,
    percentageLeft: 100,
    skill: getSkillType(skill),
    vocation: getVocationName(vocationId),
  })

  return (
    <Dialog {...dialogProps}>
      <ChipGroup
        label="Skill"
        options={skillOptions}
        value={skill}
        onChange={(e) => setSkill(e.target.value as Skill)}
      />
    </Dialog>
  )
} // ti amamus papai

export default SkillDialog
