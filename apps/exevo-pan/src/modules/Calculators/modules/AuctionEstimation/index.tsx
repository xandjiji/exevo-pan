import { useState } from 'react'
import { Input, Button, NumericInput } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import { vocationOptions, skillOptions, pvpOptions } from '../../options'
import { Vocation, Skill } from '../../types'

/* @ ToDo:

- battleye
- server location?
- charm points?
- min tc invested?

- result states
    loading
    success
    failed

- reset button
- similar results

*/

const AuctionEstimation = () => {
  const [vocation, setVocation] = useState<string>()
  const [skill, setSkill] = useState<string>()
  const [level, setLevel] = useState<number>()
  const [pvp, setPvp] = useState<string>()

  return (
    <div>
      <div>
        <ChipGroup
          label="PvP"
          options={pvpOptions}
          value={pvp}
          onChange={(e) => setPvp(e.target.value)}
          toggleable
        />
      </div>

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
    </div>
  )
}

export default AuctionEstimation
