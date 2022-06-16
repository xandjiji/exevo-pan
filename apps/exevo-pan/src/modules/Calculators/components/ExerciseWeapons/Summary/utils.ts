import * as CONSTANTS from './constants'
import { RequiredWeaponsCount, ExerciseWeapon } from './types'

const { EXERCISE_WEAPON_POINTS } = CONSTANTS

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

export const autoRequiredWeapons = (
  pointsRequired: number,
): RequiredWeaponsCount => {
  const lasting = calculateWeaponCount(
    pointsRequired,
    EXERCISE_WEAPON_POINTS.lasting,
    false,
  )

  const durable = calculateWeaponCount(
    lasting.remainingPoints,
    EXERCISE_WEAPON_POINTS.durable,
    false,
  )

  const regular = calculateWeaponCount(
    durable.remainingPoints,
    EXERCISE_WEAPON_POINTS.regular,
  )

  return {
    lasting: lasting.weaponCount,
    durable: durable.weaponCount,
    regular: regular.weaponCount,
  }
}

export const customRequiredWeapons = (
  pointsRequired: number,
  weapon: ExerciseWeapon,
): RequiredWeaponsCount => {
  const weaponsCount: RequiredWeaponsCount = {
    lasting: 0,
    durable: 0,
    regular: 0,
  }

  weaponsCount[weapon] = calculateWeaponCount(
    pointsRequired,
    CONSTANTS.EXERCISE_WEAPON_POINTS[weapon],
  ).weaponCount

  return weaponsCount
}
