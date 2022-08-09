import * as CONSTANTS from '../constants'
import { WeaponsObject, ExerciseWeapon } from '../types'

const { EXERCISE_WEAPONS } = CONSTANTS

export const skillCost = (weaponObject: WeaponsObject) => {
  let gold = 0
  let tc = 0
  let seconds = 0

  ;(Object.keys(weaponObject) as ExerciseWeapon[]).forEach((weapon) => {
    gold += weaponObject[weapon] * EXERCISE_WEAPONS.goldPrice[weapon]
    tc += weaponObject[weapon] * EXERCISE_WEAPONS.tcPrice[weapon]
    seconds += weaponObject[weapon] * EXERCISE_WEAPONS.seconds[weapon]
  })

  return { gold, tc, seconds }
}
