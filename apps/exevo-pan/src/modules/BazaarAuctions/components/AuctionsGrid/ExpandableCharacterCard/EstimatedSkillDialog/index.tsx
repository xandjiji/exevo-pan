import { useState, useMemo, useCallback } from 'react'
import clsx from 'clsx'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { Dialog, Slider, Chip, Text, SkillBar } from 'components/Atoms'
import { ChipGroup, InfoTooltip } from 'components/Organisms'
import { useStoredState } from 'hooks'
import { generateLoyaltyMarks, skillAfterLoyalty } from 'utils'
import { routes } from 'Constants'
import { parameterNames } from 'modules/Calculators/modules/ExerciseWeapons/CharacterConfig/constants'
import {
  getInitialSkill,
  calculateMinimumSkillCost,
  getVocationName,
  getSkillType,
  getPercentageLeft,
} from './utils'
import { skillOptions } from './options'
import { EstimatedSkillDialogProps, Skill } from './types'

const Group = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div className={clsx('grid gap-2', className)} {...props} />
)

export const EstimatedSkillDialog = ({
  vocationId,
  skills,
  ...dialogProps
}: EstimatedSkillDialogProps) => {
  const { common, homepage } = useTranslations()
  const i18n = homepage.AuctionsGrid.EstimatedSkillDialog

  const [loyaltyBonus, setLoyaltyBonus] = useStoredState('cm-loyalty', 0)

  const [skill, setSkill] = useState<Skill>(() => getInitialSkill(skills))
  const selectedSkillValue = skills[skill]
  const integerSelectedSkillValue = Math.floor(selectedSkillValue)
  const skillType = getSkillType(skill)
  const vocation = getVocationName(vocationId)

  const skillCost = calculateMinimumSkillCost({
    currentSkill: skill === 'magic' ? 0 : 10,
    targetSkill: integerSelectedSkillValue,
    loyaltyBonus: 0,
    percentageLeft: 100,
    skill: skillType,
    vocation,
  })

  const skillWithLoyalty = skillAfterLoyalty({
    skillValue: selectedSkillValue,
    skill: skillType,
    vocation,
    loyaltyBonus,
  })

  const integerSkillWithLoyalty = Math.floor(skillWithLoyalty)
  const percentageLeft = getPercentageLeft(skillWithLoyalty)

  return (
    <Dialog className="grid" isOpen heading={i18n.heading} {...dialogProps}>
      <div className="grid w-fit gap-6">
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
            (value: number) =>
              value ? `${value * 72} ${i18n.loyaltyPoints}` : i18n.none,
            [i18n],
          )}
          marks={useMemo(() => generateLoyaltyMarks(i18n.none), [i18n])}
          value={loyaltyBonus}
          onChange={(e) => setLoyaltyBonus(+e.target.value)}
        />

        <div
          className="border-separator text-tsm grid justify-between gap-6 border-0 border-solid pt-6 sm:flex"
          style={{ borderTopWidth: 1 }}
        >
          <Group>
            <InfoTooltip.LabelWrapper className="font-bold">
              {i18n.skillValue}
              <InfoTooltip
                labelSize
                content={
                  <p className="max-w-[180px] leading-relaxed">
                    {i18n.tooltip}: <strong>exercise weapons</strong>,{' '}
                    <strong>exercise dummy</strong> {common.and}{' '}
                    <strong>double XP/Skill event</strong>.
                  </p>
                }
              />
            </InfoTooltip.LabelWrapper>
            <div className="flex items-center gap-2">
              <Chip gray>
                <Text.GoldCoin value={skillCost.gold} />
              </Chip>
              <small className="font-light">{common.or}</small>
              <Chip gray>
                <Text.TibiaCoin value={skillCost.tc} />
              </Chip>
            </div>
          </Group>

          <Group className="min-w-fit">
            <strong className="whitespace-nowrap pr-6">
              {i18n.skillWithLoyalty}
            </strong>
            <SkillBar
              skillName={`${skill} (+${
                Math.floor(skillWithLoyalty) - integerSelectedSkillValue
              })`}
              skillValue={skillWithLoyalty}
            />
          </Group>
        </div>
      </div>

      <p className="text-tsm mt-6 text-right">
        {templateMessage(i18n.goToCalculator, {
          calculatorPage: (
            <NextLink
              href={`${routes.EXERCISE_WEAPONS}?${[
                `${parameterNames.vocation}=${vocation}`,
                `${parameterNames.skill}=${skillType}`,
                `${parameterNames.currentSkill}=${integerSkillWithLoyalty}`,
                `${parameterNames.targetSkill}=${integerSkillWithLoyalty}`,
                `${parameterNames.percentageLeft}=${percentageLeft}`,
                `${parameterNames.loyalty}=${loyaltyBonus}`,
              ].join('&')}`}
              className="text-primaryHighlight whitespace-nowrap font-bold leading-relaxed"
            >
              {i18n.calculatorPage}
            </NextLink>
          ),
        })}
      </p>
    </Dialog>
  )
} // ti amamus papai
