import { Vocation, Skill } from './types'

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

export const SKILL = 1600

export const EXERCISE_WEAPON_POINTS = {
  regular: 300000,
  durable: 1080000,
  lasting: 8640000,
}
