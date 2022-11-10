import * as faker from 'faker'
import { statistics } from '../constants'
import { randomCharacter } from './CharacterMaker'
import { randomServer } from './serverMaker'
import { randomRange } from '../utils'

const randomMonthlySummary = (): MonthlySummary => ({
  current: randomRange(statistics.month.current),
  lastMonth: Array.from({ length: statistics.month.lastMonth.SIZE }, () =>
    randomRange(statistics.month.lastMonth),
  ),
})

const randomTop10 = (): CharacterObject[] =>
  Array.from({ length: statistics.top.SIZE }, randomCharacter).map(
    (character) => ({
      ...character,
      serverData: { ...randomServer(), serverId: character.serverId },
    }),
  )

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
  top10Bid: randomTop10(),
  top10Level: randomTop10(),
  top10Magic: randomTop10(),
  top10Club: randomTop10(),
  top10Fist: randomTop10(),
  top10Sword: randomTop10(),
  top10Fishing: randomTop10(),
  top10Axe: randomTop10(),
  top10Distance: randomTop10(),
  top10Shielding: randomTop10(),
  vocationPercentage: randomDistributionData(),
})
