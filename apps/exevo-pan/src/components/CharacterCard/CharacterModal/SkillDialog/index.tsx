import { useState, useMemo, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Dialog, Slider } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import { useStoredState } from 'hooks'
import { generateLoyaltyMarks } from 'utils'
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

- skill with loyalty

- skill link with params (targetSkill, vocation, skill, loyalty, param)

- i18n (SkillDialog)
*/

const SkillDialog = ({
  vocationId,
  skills,
  ...dialogProps
}: SkillDialogProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [loyaltyBonus, setLoyaltyBonus] = useStoredState('cm-loyalty', 0)
  const [skill, setSkill] = useState<Skill>(() => getInitialSkill(skills))
  const selectedSkillValue = skills[skill]

  const skillCost = useMemo(
    () =>
      calculateMinimumSkillCost({
        currentSkill: 10,
        targetSkill: Math.floor(selectedSkillValue),
        loyaltyBonus: 0,
        percentageLeft: 100,
        skill: getSkillType(skill),
        vocation: getVocationName(vocationId),
      }),
    [selectedSkillValue, skill, vocationId],
  )

  return (
    <Dialog {...dialogProps}>
      <ChipGroup
        label="Skill"
        options={skillOptions}
        value={skill}
        onChange={(e) => setSkill(e.target.value as Skill)}
      />
      <Slider
        label="Loyalty"
        min={0}
        max={50}
        step={5}
        displayValue
        transformDisplayedValues={useCallback(
          (value) =>
            value
              ? `${value * 72} ${
                  common.CharacterCard.CharacterModal.SkillDialog.loyaltyPoints
                }`
              : common.CharacterCard.CharacterModal.SkillDialog.none,
          [common],
        )}
        marks={useMemo(
          () =>
            generateLoyaltyMarks(
              common.CharacterCard.CharacterModal.SkillDialog.none,
            ),
          [common],
        )}
        value={loyaltyBonus}
        onChange={(e) => setLoyaltyBonus(+e.target.value)}
      />
    </Dialog>
  )
} // ti amamus papai

export default SkillDialog
