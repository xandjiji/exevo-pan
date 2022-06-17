import * as CONSTANTS from './constants'
import { WeaponsObject, ExerciseWeapon } from './types'

const { EXERCISE_WEAPONS } = CONSTANTS

const calculateWeaponCount = (
  pointsRequired: number,
  weaponPoints: number,
  round = true,
) => {
  const weaponCount = pointsRequired / weaponPoints

  return {
    weaponCount: round ? Math.ceil(weaponCount) : Math.floor(weaponCount),
    remainingPoints: round ? 0 : pointsRequired % weaponPoints,
  }
}

export const autoRequiredWeaponsCount = (
  pointsRequired: number,
): WeaponsObject => {
  const lasting = calculateWeaponCount(
    pointsRequired,
    EXERCISE_WEAPONS.skillPoints.lasting,
    false,
  )

  const durable = calculateWeaponCount(
    lasting.remainingPoints,
    EXERCISE_WEAPONS.skillPoints.durable,
    false,
  )

  const regular = calculateWeaponCount(
    durable.remainingPoints,
    EXERCISE_WEAPONS.skillPoints.regular,
  )

  return {
    lasting: lasting.weaponCount,
    durable: durable.weaponCount,
    regular: regular.weaponCount,
  }
}

export const customRequiredWeaponsCount = (
  pointsRequired: number,
  weapon: ExerciseWeapon,
): WeaponsObject => {
  const weaponsCount: WeaponsObject = {
    lasting: 0,
    durable: 0,
    regular: 0,
  }

  weaponsCount[weapon] = calculateWeaponCount(
    pointsRequired,
    EXERCISE_WEAPONS.skillPoints[weapon],
  ).weaponCount

  return weaponsCount
}

export const calculateCost = (weaponObject: WeaponsObject) => {
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

const SECONDS_IN_A_MINUTE = 60
const SECONDS_IN_AN_HOUR = 3600
const SECONDS_IN_A_DAY = 86400

export const secondsToTimeObject = (seconds: number) => ({
  days: Math.floor(seconds / SECONDS_IN_A_DAY),
  hours: Math.floor((seconds % SECONDS_IN_A_DAY) / SECONDS_IN_AN_HOUR),
  minutes: Math.ceil((seconds % SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE),
})
