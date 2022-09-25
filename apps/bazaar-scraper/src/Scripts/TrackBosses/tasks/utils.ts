/* eslint-disable no-restricted-syntax */
import { makeRangeArray } from 'utils'

export const offsetDistribution = (
  offsetBy: number,
  distribution: Distribution,
): Distribution => {
  const newDistribution: Distribution = new Map()
  for (const [interval, chance] of distribution) {
    newDistribution.set(interval + offsetBy, chance)
  }

  return newDistribution
}

export const normalizeDistributionRange = (
  distribution: Distribution,
  { min, max }: DaysRange,
): Distribution => {
  const newDistribution: Distribution = new Map()

  const intervalsWithinRange = new Set(makeRangeArray(min, max))

  let remainingProbabilityCeil = 0
  distribution.forEach((chance, interval) => {
    if (intervalsWithinRange.has(interval)) {
      remainingProbabilityCeil += chance
    }
  })

  distribution.forEach((chance, interval) => {
    if (intervalsWithinRange.has(interval)) {
      newDistribution.set(
        interval,
        +(chance / remainingProbabilityCeil).toFixed(4),
      )
    }
  })

  return newDistribution
}

export const dilluteDistribution = (
  distribution: Distribution,
): Distribution => {
  const intervals = [...distribution.keys()]
  const distributionLength = intervals.length

  const min = Math.min(...intervals)

  const newDistribution: Distribution = new Map()

  const applyValuesStartingAt = (startingOffset: number) => {
    let offsetInc = 0
    for (const chance of distribution.values()) {
      const offset = startingOffset + offsetInc
      newDistribution.set(offset, (newDistribution.get(offset) ?? 0) + chance)

      offsetInc += 1
    }
  }

  for (let offsetInc = 0; offsetInc < distributionLength; offsetInc += 1) {
    const offset = min + offsetInc

    applyValuesStartingAt(offset)
  }

  return normalizeDistributionRange(newDistribution, {
    min: Math.min(...newDistribution.keys()),
    max: Math.max(...newDistribution.keys()),
  })
}
