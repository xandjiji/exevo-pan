import { useState } from 'react'
import { Checkbox } from 'components/Atoms'
import CharacterConfig from './CharacterConfig'
import * as CONSTANTS from './constants'

export const ExerciseWeapons = () => {
  const [hasDummy, setHasDummy] = useState(false)
  const [isDouble, setIsDouble] = useState(false)
  const [pointsRequired, setPointsRequired] = useState(0)

  return (
    <div>
      <CharacterConfig updatePointsRequired={setPointsRequired} />

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
          {Math.ceil(pointsRequired / CONSTANTS.EXERCISE_WEAPON_POINTS.regular)}
        </strong>
      </p>
    </div>
  )
}
