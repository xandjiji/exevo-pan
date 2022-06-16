import { useState, useMemo } from 'react'
import { Checkbox } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { autoRequiredWeapons, customRequiredWeapons } from './utils'
import { weaponOptions } from './options'
import * as CONSTANTS from './constants'
import { SummaryProps, WeaponOption, RequiredWeaponsCount } from './types'

/* @ ToDo:

- Weapons necessárias (lasting, durable, normal, etc)
- Custo (GP/TC)
- Tempo
- Equivalente a X tempo offline

*/

const Summary = ({ pointsRequired }: SummaryProps) => {
  const [hasDummy, setHasDummy] = useState(false)
  const [isDouble, setIsDouble] = useState(false)
  const [exerciseWeapon, setExerciseWeapon] = useState<WeaponOption>('auto')

  const weaponsRequired: RequiredWeaponsCount = useMemo(() => {
    const finalPointsRequired =
      pointsRequired /
      (hasDummy ? CONSTANTS.DIVIDER.hasDummy : 1) /
      (isDouble ? CONSTANTS.DIVIDER.isDouble : 1)

    return exerciseWeapon === 'auto'
      ? autoRequiredWeapons(finalPointsRequired)
      : customRequiredWeapons(finalPointsRequired, exerciseWeapon)
  }, [pointsRequired, hasDummy, isDouble, exerciseWeapon])

  console.log(weaponsRequired)

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
