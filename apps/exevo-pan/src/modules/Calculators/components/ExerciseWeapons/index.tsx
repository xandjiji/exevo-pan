import { useState, useMemo } from 'react'
import { Switch, Input, Slider } from 'components/Atoms'
import { Select } from 'components/Organisms'
import * as CONSTANTS from './constants'
import * as Calculate from './utils'
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
  const [currentSkill, setCurrentSkill] = useState(10)
  const [targetSkill, setTargetSkill] = useState(50)

  const totalPoints = useMemo(
    () =>
      Calculate.totalPoints({
        currentSkill,
        vocation,
        skill,
      }),
    [currentSkill, vocation, skill],
  )

  const targetTotalPoints = useMemo(
    () =>
      Calculate.totalPoints({
        currentSkill: targetSkill,
        vocation,
        skill,
      }),
    [targetSkill, vocation, skill],
  )

  return (
    <div>
      <Select
        label="Vocation"
        options={vocationOptions}
        value={vocation}
        onChange={(e) => setVocation(e.target.value as Vocation)}
      />

      <Select
        label="Skill"
        options={skillOptions}
        value={skill}
        onChange={(e) => setSkill(e.target.value as Skill)}
      />

      <Input
        label="Current skill"
        type="number"
        value={currentSkill}
        onChange={(e) => setCurrentSkill(+e.target.value)}
      />

      <Input
        label="Target skill"
        type="number"
        value={targetSkill}
        onChange={(e) => setTargetSkill(+e.target.value)}
      />

      <p>
        Regular weapons required:{' '}
        <strong>
          {Math.ceil(
            (targetTotalPoints - totalPoints) /
              CONSTANTS.EXERCISE_WEAPON_POINTS.regular,
          )}
        </strong>
      </p>
    </div>
  )
}
