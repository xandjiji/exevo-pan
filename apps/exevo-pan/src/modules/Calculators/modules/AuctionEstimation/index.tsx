import { useState } from 'react'
import { Input, Button, NumericInput } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import { vocationOptions, skillOptions } from '../../options'
import { Vocation, Skill } from '../../types'

const AuctionEstimation = () => {
  const [vocation, setVocation] = useState<string>()
  const [skill, setSkill] = useState<string>()
  const [level, setLevel] = useState<number>()

  return (
    <div>
      <ChipGroup
        label="Vocation"
        options={vocationOptions}
        value={vocation}
        onChange={(e) => setVocation(e.target.value)}
      />
      <ChipGroup
        label="Skill"
        options={skillOptions}
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <NumericInput
        label="Level"
        alwaysValid
        step={50}
        value={level}
        onChange={setLevel}
      />
    </div>
  )
}

export default AuctionEstimation
