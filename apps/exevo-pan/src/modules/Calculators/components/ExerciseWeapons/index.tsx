import { useState, useMemo } from 'react'
import { Switch, Input, Slider } from 'components/Atoms'
import { Select } from 'components/Organisms'
import * as CONSTANTS from './constants'
import * as Calculate from './utils'
import { Vocation, Skill } from './types'

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

const vocationOptions: Option[] = [
  { name: 'Knight', value: 'knight' },
  { name: 'Paladin', value: 'paladin' },
  { name: 'Druid', value: 'druid' },
  { name: 'Sorcerer', value: 'sorcerer' },
]

const skillOptions: Option[] = [
  { name: 'Magic', value: 'magic' },
  { name: 'Melee', value: 'melee' },
  { name: 'Distance', value: 'distance' },
]

export const ExerciseWeapons = () => {
  const [vocation, setVocation] = useState<Vocation>('knight')
  const [skill, setSkill] = useState<Skill>('magic')

  const totalPoints = useMemo(
    () =>
      Calculate.totalPoints({
        currentSkill: 100,
        vocationConstant: CONSTANTS.VOCATION[vocation][skill],
        skillConstant: CONSTANTS.SKILL[skill],
        skillOffset: CONSTANTS.SKILL_OFFSET[skill],
      }),
    [vocation, skill],
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

      <p>
        Total points: <strong>{totalPoints}</strong>
      </p>
    </div>
  )
}
