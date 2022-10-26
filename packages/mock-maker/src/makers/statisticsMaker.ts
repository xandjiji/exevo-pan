import * as faker from 'faker'
import { statistics } from '../constants'
import { randomCharacter } from './CharacterMaker'
import { randomRange } from '../utils'

const randomMonthlySummary = (): MonthlySummary => ({
  current: randomRange(statistics.month.current),
  lastMonth: Array.from({ length: statistics.month.lastMonth.SIZE }, () =>
    randomRange(statistics.month.lastMonth),
  ),
})

const randomDistributionData = (): DistributionData => {
  const [knight, paladin, sorcerer, druid] = Array.from({ length: 4 }, () =>
    faker.datatype.float({
      min: 0,
      max: 25,
      precision: 0.01,
    }),
  )
  const rooker = 100 - (knight + paladin + sorcerer + druid)

  const data = {
    rooker,
    knight,
    paladin,
    sorcerer,
    druid,
  }

  return data
}

export const randomStatisticsData = (): StatisticsData => ({
  totalRevenue: randomMonthlySummary(),
  totalTibiaCoins: randomMonthlySummary(),
  successRate: faker.datatype.float({
    min: 40,
    max: 50,
    precision: 0.01,
  }),
  top10Bid: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Level: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Magic: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Club: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Fist: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Sword: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Fishing: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Axe: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Distance: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  top10Shielding: Array.from({ length: statistics.top.SIZE }, randomCharacter),
  vocationPercentage: randomDistributionData(),
})
