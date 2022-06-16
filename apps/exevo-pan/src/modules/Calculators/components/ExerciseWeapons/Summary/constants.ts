import { ExerciseWeapon } from './types'

export const EXERCISE_WEAPON_CHARGES: Record<ExerciseWeapon, number> = {
  lasting: 14400,
  regular: 1800,
  durable: 500,
}

export const EXERCISE_WEAPON_POINTS: Record<ExerciseWeapon, number> = {
  regular: 300000,
  durable: 1080000,
  lasting: 8640000,
}

export const DIVIDER = {
  isDouble: 2,
  hasDummy: 1.1,
}
