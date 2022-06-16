import { WeaponsObject } from './types'

const skillPoints: WeaponsObject = {
  regular: 300000,
  durable: 1080000,
  lasting: 8640000,
}

const charges: WeaponsObject = {
  lasting: 14400,
  regular: 1800,
  durable: 500,
}

export const EXERCISE_WEAPONS = { skillPoints, charges }

export const DIVIDER = {
  isDouble: 2,
  hasDummy: 1.1,
}
