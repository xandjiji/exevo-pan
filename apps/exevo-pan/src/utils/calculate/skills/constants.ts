import { WeaponsObject, Skill, Vocation } from './types'

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
  lasting: 10000000,
  durable: 1250000,
  regular: 347222,
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

export const VOCATION: Record<Vocation, Record<Skill, number>> = {
  knight: {
    magic: 3,
    melee: 1.1,
    distance: 1.4,
  },
  paladin: {
    magic: 1.4,
    melee: 1.2,
    distance: 1.1,
  },
  druid: {
    magic: 1.1,
    melee: 1.8,
    distance: 1.8,
  },
  sorcerer: {
    magic: 1.1,
    melee: 2,
    distance: 2,
  },
}

export const SKILLS: Record<Skill, number> = {
  magic: 1600,
  distance: 30,
  melee: 50,
}
