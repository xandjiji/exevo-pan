// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import { filterItemData } from '../utils'

const randomItem = (): RareItemObject => {
  if (faker.datatype.boolean()) {
    return []
  }
  return Array.from({ length: 8 }, () =>
    faker.datatype.number({ min: 100000, max: 999999 }),
  ).slice(faker.datatype.number({ min: 0, max: 3 }))
}

export const randomItemData = (): {
  rawItemData: RareItemData
  itemData: RareItemData
} => {
  const randomAmount = faker.datatype.number({ min: 20, max: 50 })
  const rawItemData: RareItemData = {}
  for (let i = 0; i < randomAmount; i += 1) {
    rawItemData[faker.name.lastName()] = randomItem()
  }

  const itemData = filterItemData(rawItemData)

  return { rawItemData, itemData }
}
