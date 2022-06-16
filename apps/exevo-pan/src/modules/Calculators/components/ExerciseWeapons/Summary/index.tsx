import { useState, useMemo } from 'react'
import { Checkbox } from 'components/Atoms'
import { Select } from 'components/Organisms'
import {
  autoRequiredWeaponsCount,
  customRequiredWeaponsCount,
  calculateCost,
} from './utils'
import { weaponOptions } from './options'
import * as CONSTANTS from './constants'
import { SummaryProps, WeaponOption, WeaponsObject } from './types'

/* @ ToDo:

- Equivalente a X tempo offline

*/

const Summary = ({ pointsRequired }: SummaryProps) => {
  const [hasDummy, setHasDummy] = useState(false)
  const [isDouble, setIsDouble] = useState(false)
  const [exerciseWeapon, setExerciseWeapon] = useState<WeaponOption>('auto')

  const weaponsRequired: WeaponsObject = useMemo(() => {
    const finalPointsRequired =
      pointsRequired /
      (hasDummy ? CONSTANTS.DIVIDER.hasDummy : 1) /
      (isDouble ? CONSTANTS.DIVIDER.isDouble : 1)

    return exerciseWeapon === 'auto'
      ? autoRequiredWeaponsCount(finalPointsRequired)
      : customRequiredWeaponsCount(finalPointsRequired, exerciseWeapon)
  }, [pointsRequired, hasDummy, isDouble, exerciseWeapon])

  const cost = useMemo(() => calculateCost(weaponsRequired), [weaponsRequired])

  console.log(weaponsRequired)
  console.log(cost)

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
      <Select
        label="Weapon charges"
        options={weaponOptions}
        value={exerciseWeapon}
        onChange={(e) => setExerciseWeapon(e.target.value as WeaponOption)}
      />

      <p>
        Regular weapons required: <strong>s</strong>
      </p>
    </div>
  )
}

export default Summary
