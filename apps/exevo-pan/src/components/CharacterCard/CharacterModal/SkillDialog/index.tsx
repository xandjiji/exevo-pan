import { useState, useMemo, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Dialog, Slider, Chip, Text } from 'components/Atoms'
import { ChipGroup, InfoTooltip } from 'components/Organisms'
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
        currentSkill: skill === 'magic' ? 0 : 10,
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
      <div className="grid w-full gap-6">
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
                    common.CharacterCard.CharacterModal.SkillDialog
                      .loyaltyPoints
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

        <div
          className="border-separator text-tsm grid gap-4 border-0 border-solid pt-6"
          style={{ borderTopWidth: 1 }}
        >
          <div className="grid gap-2">
            <InfoTooltip.LabelWrapper className="font-bold">
              {common.CharacterCard.CharacterModal.SkillDialog.skillValue}
              <InfoTooltip
                labelSize
                content={
                  <p className="max-w-[180px] leading-relaxed">
                    {common.CharacterCard.CharacterModal.SkillDialog.tooltip}{' '}
                    <strong>exercise wands</strong>,{' '}
                    <strong>exercise dummy</strong> {common.and}{' '}
                    <strong>double XP/Skill event</strong>.
                  </p>
                }
              />
            </InfoTooltip.LabelWrapper>
            <div className="flex items-center gap-2">
              <Chip className="bg-separator/60 flex shrink-0 items-center gap-1.5 rounded-xl py-1.5 px-3 font-normal transition-colors">
                <Text.GoldCoin value={skillCost.gold} />
              </Chip>
              {common.or}
              <Chip className="bg-separator/60 flex shrink-0 items-center gap-1.5 rounded-xl py-1.5 px-3 font-normal transition-colors">
                <Text.TibiaCoin value={skillCost.tc} />
              </Chip>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
} // ti amamus papai

export default SkillDialog
