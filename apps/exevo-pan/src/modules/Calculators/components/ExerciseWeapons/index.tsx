import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { Input, Slider, Checkbox } from 'components/Atoms'
import { Select, ChipGroup } from 'components/Organisms'
import ChevronRight from 'assets/svgs/chevronRight.svg'
import * as CONSTANTS from './constants'
import { calculateRequiredPoints } from './utils'
import { TypedOption, Vocation, Skill } from './types'

/* 
    @ ToDo:
    - vocation (chip group)
    - skill (chip group)
        highlight for vocation
    - current skill (base + loyalty) (input)
    - % to next (slider)
    - desired skill (input)
    - loyalty (slider)
    - double event (checkbox)
    - private dummy (checkbox)

    - weapon charges ???
*/

const vocationOptions: TypedOption<Vocation>[] = [
  { name: 'Knight', value: 'knight' },
  { name: 'Paladin', value: 'paladin' },
  { name: 'Druid', value: 'druid' },
  { name: 'Sorcerer', value: 'sorcerer' },
]

const skillOptions: TypedOption<Skill>[] = [
  { name: 'Magic', value: 'magic' },
  { name: 'Melee', value: 'melee' },
  { name: 'Distance', value: 'distance' },
]

export const ExerciseWeapons = () => {
  const [vocation, setVocation] = useState<Vocation>('knight')
  const [skill, setSkill] = useState<Skill>('melee')
  const [currentSkill, setCurrentSkill] = useState(120)
  const [targetSkill, setTargetSkill] = useState(121)
  const [loyaltyBonus, setLoyaltyBonus] = useState(50)
  const [percentageLeft, setPercentageLeft] = useState(39.72)
  const [hasDummy, setHasDummy] = useState(true)
  const [isDouble, setIsDouble] = useState(false)

  const pointsRequired = useMemo(
    () =>
      calculateRequiredPoints({
        currentSkill,
        targetSkill,
        vocation,
        skill,
        percentageLeft,
      }) /
      (hasDummy ? CONSTANTS.DIVIDER.hasDummy : 1) /
      (isDouble ? CONSTANTS.DIVIDER.isDouble : 1),
    [
      currentSkill,
      targetSkill,
      vocation,
      skill,
      percentageLeft,
      hasDummy,
      isDouble,
    ],
  )

  const invalidSkill = targetSkill <= currentSkill

  return (
    <div>
      <div className="grid gap-4">
        <ChipGroup
          label="Vocation (value='sorcerer')"
          options={vocationOptions}
          /* value={vocation} */
          value="sorcerer"
          onChange={(e) => console.log(e.target.value)}
        />
        <ChipGroup
          label="Vocation (defaultValue='sorcerer')"
          options={vocationOptions}
          /* value={vocation} */
          defaultValue="sorcerer"
          onChange={(e) => console.log(e.target.value)}
        />
        <ChipGroup
          label="Vocation (controlled)"
          options={vocationOptions}
          /* value={vocation} */
          value={vocation}
          onChange={(e) => setVocation(e.target.value as Vocation)}
        />
        <Select
          label="Vocation"
          options={vocationOptions}
          value={vocation}
          onChange={(e) => setVocation(e.target.value as Vocation)}
          noAlert
        />

        <Select
          label="Skill"
          options={skillOptions}
          value={skill}
          onChange={(e) => setSkill(e.target.value as Skill)}
          noAlert
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
      </div>

      <div className="mb-[200px]" />

      <Checkbox
        label="Exercise dummy"
        checked={hasDummy}
        onChange={(e) => setHasDummy(e.target.checked)}
      />
      <Checkbox
        label="Double event"
        checked={isDouble}
        onChange={(e) => setIsDouble(e.target.checked)}
      />

      <p>
        Regular weapons required:{' '}
        <strong>
          {Math.ceil(
            pointsRequired /
              (CONSTANTS.EXERCISE_WEAPON_POINTS.regular *
                (1 + loyaltyBonus / 100)),
          )}
        </strong>
      </p>
    </div>
  )
}
