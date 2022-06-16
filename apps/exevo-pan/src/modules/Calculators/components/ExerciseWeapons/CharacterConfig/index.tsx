import { useState, useMemo, useEffect } from 'react'
import clsx from 'clsx'
import { Input, Slider } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import ChevronRight from 'assets/svgs/chevronRight.svg'
import { Card } from '../../layout'
import { vocationOptions, skillOptions } from './options'
import { calculateRequiredPoints } from './utils'
import { CharacterConfigProps, Vocation, Skill } from './types'

const CharacterConfig = ({ updatePointsRequired }: CharacterConfigProps) => {
  const [vocation, setVocation] = useState<Vocation>('knight')
  const [skill, setSkill] = useState<Skill>('melee')
  const [currentSkill, setCurrentSkill] = useState(100)
  const [targetSkill, setTargetSkill] = useState(120)
  const [loyaltyBonus, setLoyaltyBonus] = useState(0)
  const [percentageLeft, setPercentageLeft] = useState(50)

  const pointsRequired = useMemo(
    () =>
      calculateRequiredPoints({
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
    <Card>
      <ChipGroup
        label="Vocation"
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

      <div className="flex gap-8">
        <div className="flex items-end gap-2">
          <Input
            label="Current skill"
            type="number"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(+e.target.value)}
            error={invalidSkill}
            noAlert
            className="w-20"
          />
          <ChevronRight
            className={clsx(
              'mb-1.5',
              invalidSkill ? 'fill-red' : 'fill-onSurface',
            )}
          />
          <Input
            label="Target skill"
            type="number"
            value={targetSkill}
            onChange={(e) => setTargetSkill(+e.target.value)}
            error={invalidSkill}
            noAlert
            className="w-20"
          />
        </div>

        <Slider
          label="% left"
          title={`You have ${percentageLeft} percent to go`}
          min={0}
          max={100}
          step={0.01}
          showInput
          invert
          value={percentageLeft}
          onChange={(e) => setPercentageLeft(+e.target.value)}
          className="flex-grow"
        />
      </div>

      <Slider
        label="Loyalty"
        min={0}
        max={50}
        step={5}
        displayValue
        transformDisplayedValues={(value) => {
          if (!value) return 'None'

          return `${value}% bonus`
        }}
        marks={[
          { label: 'None', value: 0 },
          { label: '5%', value: 5 },
          { label: '10%', value: 10 },
          { label: '15%', value: 15 },
          { label: '20%', value: 20 },
          { label: '25%', value: 25 },
          { label: '30%', value: 30 },
          { label: '35%', value: 35 },
          { label: '40%', value: 40 },
          { label: '45%', value: 45 },
          { label: '50%', value: 50 },
        ]}
        value={loyaltyBonus}
        onChange={(e) => setLoyaltyBonus(+e.target.value)}
      />
    </Card>
  )
}

export default CharacterConfig
