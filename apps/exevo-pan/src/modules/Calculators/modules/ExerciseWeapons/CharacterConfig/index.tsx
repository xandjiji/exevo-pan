import { useMemo, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { useStoredUrlState } from 'hooks'
import { useTranslations } from 'contexts/useTranslation'
import { LabeledCard, Input, Slider } from 'components/Atoms'
import { ChipGroup, InfoTooltip, ClientComponent } from 'components/Organisms'
import { ChevronRightIcon } from 'assets/svgs'
import { blurOnEnter, requiredSkillPoints, generateLoyaltyMarks } from 'utils'
import { parameterNames } from './constants'
import { vocationOptions, skillOptions } from '../../../options'
import { Vocation, Skill } from '../../../types'
import { CharacterConfigProps } from './types'

const CharacterConfig = ({ updatePointsRequired }: CharacterConfigProps) => {
  const {
    translations: { calculators },
  } = useTranslations()

  const [vocation, setVocation] = useStoredUrlState<Vocation>({
    key: parameterNames.vocation,
    storeKey: 'ew-vocation',
    defaultValue: 'knight',
  })

  const [skill, setSkill] = useStoredUrlState<Skill>({
    key: parameterNames.skill,
    storeKey: 'ew-skill',
    defaultValue: 'melee',
  })

  const [currentSkill, setCurrentSkill] = useStoredUrlState({
    key: parameterNames.currentSkill,
    storeKey: 'ew-currentSkill',
    defaultValue: 100,
    decode: Number,
  })

  const [targetSkill, setTargetSkill] = useStoredUrlState({
    key: parameterNames.targetSkill,
    storeKey: 'ew-targetSkill',
    defaultValue: 120,
    decode: Number,
  })

  const [loyaltyBonus, setLoyaltyBonus] = useStoredUrlState({
    key: parameterNames.loyalty,
    storeKey: 'ew-loyalty',
    defaultValue: 0,
    decode: Number,
  })

  const [percentageLeft, setPercentageLeft] = useStoredUrlState({
    key: parameterNames.percentageLeft,
    storeKey: 'ew-percentageLeft',
    defaultValue: 50,
    decode: Number,
  })

  const pointsRequired = useMemo(
    () =>
      requiredSkillPoints({
        currentSkill,
        targetSkill,
        vocation,
        skill,
        percentageLeft,
        loyaltyBonus,
      }),
    [currentSkill, targetSkill, vocation, skill, percentageLeft, loyaltyBonus],
  )

  useEffect(
    () => updatePointsRequired(pointsRequired),
    [pointsRequired, updatePointsRequired],
  )

  const invalidSkill = targetSkill <= currentSkill

  return (
    <LabeledCard labelText="Character">
      <ClientComponent className="grid gap-4">
        <ChipGroup
          label={calculators.ExerciseWeapons.labels.vocation}
          options={vocationOptions}
          value={vocation}
          onChange={(e) => setVocation(e.target.value as Vocation)}
        />

        <ChipGroup
          label="Skill"
          options={skillOptions}
          value={skill}
          onChange={(e) => setSkill(e.target.value as Skill)}
        />
      </ClientComponent>

      <div className="grid items-start gap-4 sm:flex sm:gap-8">
        <ClientComponent className="flex items-end gap-2">
          <Input
            label={
              <InfoTooltip.LabelWrapper className="whitespace-nowrap">
                {calculators.ExerciseWeapons.labels.currentSkill}
                <InfoTooltip content="Base + Loyalty" labelSize />
              </InfoTooltip.LabelWrapper>
            }
            aria-label={calculators.ExerciseWeapons.labels.currentSkill}
            type="number"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(+e.target.value)}
            error={invalidSkill}
            className="w-full sm:w-20"
          />
          <ChevronRightIcon
            className={clsx(
              'mb-1.5 shrink-0',
              invalidSkill ? 'fill-red' : 'fill-onSurface',
            )}
          />
          <Input
            label={calculators.ExerciseWeapons.labels.targetSkill}
            type="number"
            value={targetSkill}
            onChange={(e) => setTargetSkill(+e.target.value)}
            error={invalidSkill}
            className="w-full sm:w-20"
          />
        </ClientComponent>

        <Slider
          label={calculators.ExerciseWeapons.labels.percentageLeft}
          title={`You have ${percentageLeft} percent to go`}
          min={0}
          max={100}
          step={0.01}
          showInput
          invert
          value={percentageLeft}
          onChange={(e) => setPercentageLeft(+e.target.value)}
          className="flex-grow"
          onKeyPress={blurOnEnter}
          enterKeyHint="done"
          ssr
        />
      </div>

      <Slider
        label="Loyalty"
        min={0}
        max={50}
        step={5}
        displayValue
        transformDisplayedValues={useCallback(
          (value: number) =>
            value
              ? `${value * 72} ${
                  calculators.ExerciseWeapons.labels.loyaltyPoints
                }`
              : calculators.none,
          [calculators],
        )}
        marks={useMemo(
          () => generateLoyaltyMarks(calculators.none),
          [calculators],
        )}
        value={loyaltyBonus}
        onChange={(e) => setLoyaltyBonus(+e.target.value)}
        ssr
      />
    </LabeledCard>
  )
}

export default CharacterConfig
