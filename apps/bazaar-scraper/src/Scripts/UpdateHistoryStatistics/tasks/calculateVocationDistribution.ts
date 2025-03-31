import { broadcast } from 'logging'

const vocationIdToKey = {
  0: 'rooker',
  1: 'knight',
  2: 'paladin',
  3: 'sorcerer',
  4: 'druid',
  5: 'monk',
} as const

type VocationCountKey = typeof vocationIdToKey[keyof typeof vocationIdToKey]

const PRECISION = 2
const fixedPercentage = (value: number): number =>
  +(value * 100).toFixed(PRECISION)

export const calculateVocationDistribution = (
  history: PartialCharacterObject[],
): DistributionData => {
  broadcast('Calculating vocation distributions...', 'neutral')

  const totalCount = history.length

  if (totalCount === 0) {
    return {
      rooker: 20,
      knight: 20,
      paladin: 20,
      sorcerer: 20,
      druid: 20,
    }
  }

  const vocationCount: Record<VocationCountKey, number> = {
    rooker: 0,
    knight: 0,
    paladin: 0,
    sorcerer: 0,
    druid: 0,
    monk: 0,
  }

  history.forEach(({ vocationId }) => {
    const vocation = vocationIdToKey[vocationId as keyof typeof vocationIdToKey]
    vocationCount[vocation] += 1
  })

  return {
    rooker: fixedPercentage(vocationCount.rooker / totalCount),
    knight: fixedPercentage(vocationCount.knight / totalCount),
    paladin: fixedPercentage(vocationCount.paladin / totalCount),
    sorcerer: fixedPercentage(vocationCount.sorcerer / totalCount),
    druid: fixedPercentage(vocationCount.druid / totalCount),
    monk: fixedPercentage(vocationCount.monk / totalCount),
  }
}
