import { useState } from 'react'
import { Switch, Input, Slider } from 'components/Atoms'
import { Select } from 'components/Organisms'
import * as CONSTANTS from './constants'
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
        Current constant: <strong>{CONSTANTS.VOCATION[vocation][skill]}</strong>
      </p>
    </div>
  )
}
