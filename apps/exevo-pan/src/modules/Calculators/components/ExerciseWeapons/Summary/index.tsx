import { useState, useMemo } from 'react'
import { Checkbox } from 'components/Atoms'
import * as CONSTANTS from '../constants'
import { SummaryProps } from './types'

const Summary = ({ pointsRequired }: SummaryProps) => {
  const [hasDummy, setHasDummy] = useState(false)
  const [isDouble, setIsDouble] = useState(false)

  const weaponsRequired = useMemo(
    () =>
      Math.ceil(
        pointsRequired /
          CONSTANTS.EXERCISE_WEAPON_POINTS.regular /
          (hasDummy ? CONSTANTS.DIVIDER.hasDummy : 1) /
          (isDouble ? CONSTANTS.DIVIDER.isDouble : 1),
      ),
    [pointsRequired, hasDummy, isDouble],
  )

  return (
    <div>
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
        Regular weapons required: <strong>{weaponsRequired}</strong>
      </p>
    </div>
  )
}

export default Summary
