/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as faker from 'faker'
import { statistics } from '../constants'
import { randomCharacter } from './CharacterMaker'

const randomMonthlySummary = (): MonthlySummary => ({
  current: faker.datatype.number({
    min: statistics.month.current.MIN,
    max: statistics.month.current.MAX,
  }),
  lastMonth: Array.from({ length: statistics.month.lastMonth.SIZE }, () =>
    faker.datatype.number({
      min: statistics.month.lastMonth.MIN,
      max: statistics.month.lastMonth.MAX,
    }),
  ),
})

const randomCharacterInfo = (key: keyof CharacterInfoKey): CharacterInfo => {
  const character = randomCharacter()

  const skillKeys = Object.keys(character.skills)

  const value = skillKeys.includes(key)
    ? character.skills[key as keyof CharacterSkillsObject]
    : character[key as keyof PartialCharacterObject]

  return {
    id: character.id,
    nickname: character.nickname,
    [key]: value,
  }
}

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
  top10Bid: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('currentBid'),
  ),
  top10Level: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('level'),
  ),
  top10Magic: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('magic'),
  ),
  top10Club: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('club'),
  ),
  top10Fist: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('fist'),
  ),
  top10Sword: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('sword'),
  ),
  top10Fishing: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('fishing'),
  ),
  top10Axe: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('axe'),
  ),
  top10Distance: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('distance'),
  ),
  top10Shielding: Array.from({ length: statistics.top.SIZE }, () =>
    randomCharacterInfo('shielding'),
  ),
  vocationPercentage: randomDistributionData(),
})
