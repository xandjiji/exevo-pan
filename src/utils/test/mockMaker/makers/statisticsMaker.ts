import * as faker from 'faker'
import { randomCharacterData } from './characterMaker'
import { singleSampleFrom } from '../utils'

const randomMonthlySummary = (): MonthlySummary => ({
  current: faker.datatype.number({ min: 50000000, max: 99999999 }),
  lastMonth: Array.from({ length: 28 }, () =>
    faker.datatype.number({ min: 100000, max: 400000 }),
  ),
})

const randomCharacterInfo = (key: keyof CharacterInfoKey): CharacterInfo => {
  const { characterList } = randomCharacterData(1)
  const randomCharacter = characterList[0]
  return {
    id: randomCharacter.id,
    nickname: randomCharacter.nickname,
    [key]: randomCharacter[key],
  }
}

const possibleCharacterInfoKeys = [
  'auctionEnd',
  'currentBid',
  'hasBeenBidded',
  'outfitId',
  'serverId',
  'vocationId',
  'level',
  'imbuements',
  'items',
  'charms',
  'transfer',
  'hasSoulwar',
  'skills',
]

const randomTop10 = (): CharacterInfo[] =>
  Array.from({ length: 10 }, () =>
    randomCharacterInfo(
      singleSampleFrom(possibleCharacterInfoKeys) as keyof CharacterInfoKey,
    ),
  )

const randomDistributionData = (): DistributionData => {
  const distributionItems = Array.from(
    {
      length: faker.datatype.number({ min: 2, max: 10 }),
    },
    () => ({
      key: faker.name.firstName(),
      value: faker.datatype
        .float({
          min: 10,
          max: 130,
          precision: 0.01,
        })
        .toString(),
    }),
  )

  const newDistributionData = {} as DistributionData
  for (const distributionItem of distributionItems) {
    newDistributionData[distributionItem.key] = distributionItem.value
  }

  return newDistributionData
}

export const randomStatisticsData = (): StatisticsData => ({
  totalRevenue: randomMonthlySummary(),
  totalTibiaCoins: randomMonthlySummary(),
  successRate: faker.datatype
    .float({
      min: 10,
      max: 130,
      precision: 0.01,
    })
    .toString(),
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
