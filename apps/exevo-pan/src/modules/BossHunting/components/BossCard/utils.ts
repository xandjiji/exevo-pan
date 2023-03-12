import { ChanceClass } from './types'

const HIGH_CHANCE = 0.25
const DEFAULT_CHANCE_CLASS: ChanceClass = 'UNKNOWN'

export const getChanceClass = (chance?: number): ChanceClass => {
  if (chance === undefined) return 'UNKNOWN'
  if (chance >= HIGH_CHANCE) return 'LIKELY'
  if (chance > 0) return 'POSSIBLE'
  if (chance === 0) return 'ZERO'

  return DEFAULT_CHANCE_CLASS
}

export const formatChance = (chance?: number) =>
  `${((chance ?? 0) * 100).toFixed(2)}%`
