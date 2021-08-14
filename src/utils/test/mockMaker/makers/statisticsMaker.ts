/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as faker from 'faker'
import { randomCharacterData } from './characterMaker'

const randomMonthlySummary = (): MonthlySummary => ({
  current: faker.datatype.number({ min: 50000000, max: 99999999 }),
  lastMonth: Array.from({ length: 28 }, () =>
    faker.datatype.number({ min: 100000, max: 400000 }),
  ),
})

const skillKeys = [
  'magic',
  'club',
  'fist',
  'sword',
  'fishing',
  'axe',
  'distance',
  'shielding',
]

const randomCharacterInfo = (key: keyof CharacterInfoKey): CharacterInfo => {
  const { characterList } = randomCharacterData(1)
  const randomCharacter = characterList[0]

  const value = skillKeys.includes(key)
    ? randomCharacter.skills[key as keyof CharacterSkillsObject]
    : randomCharacter[key as keyof PartialCharacterObject]

  return {
    id: randomCharacter.id,
    nickname: randomCharacter.nickname,
    [key]: value,
  }
}

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
  top10Bid: Array.from({ length: 10 }, () => randomCharacterInfo('currentBid')),
  top10Level: Array.from({ length: 10 }, () => randomCharacterInfo('level')),
  top10Magic: Array.from({ length: 10 }, () => randomCharacterInfo('magic')),
  top10Club: Array.from({ length: 10 }, () => randomCharacterInfo('club')),
  top10Fist: Array.from({ length: 10 }, () => randomCharacterInfo('fist')),
  top10Sword: Array.from({ length: 10 }, () => randomCharacterInfo('sword')),
  top10Fishing: Array.from({ length: 10 }, () =>
    randomCharacterInfo('fishing'),
  ),
  top10Axe: Array.from({ length: 10 }, () => randomCharacterInfo('axe')),
  top10Distance: Array.from({ length: 10 }, () =>
    randomCharacterInfo('distance'),
  ),
  top10Shielding: Array.from({ length: 10 }, () =>
    randomCharacterInfo('shielding'),
  ),
  vocationPercentage: randomDistributionData(),
})
