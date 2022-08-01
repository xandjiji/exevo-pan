import { WeaponsObject } from './types'

const skillPoints: WeaponsObject = {
  regular: 300000,
  durable: 1080000,
  lasting: 8640000,
}

const charges: WeaponsObject = {
  lasting: 14400,
  durable: 1800,
  regular: 500,
}

const goldPrice: WeaponsObject = {
  lasting: 7560000,
  durable: 945000,
  regular: 262500,
}

const tcPrice: WeaponsObject = {
  lasting: 720,
  durable: 90,
  regular: 25,
}

const seconds: WeaponsObject = {
  lasting: 28800,
  durable: 3600,
  regular: 1000,
}

export const EXERCISE_WEAPONS = {
  skillPoints,
  charges,
  goldPrice,
  tcPrice,
  seconds,
}

export const DIVIDER = {
  isDouble: 2,
  hasDummy: 1.1,
}
