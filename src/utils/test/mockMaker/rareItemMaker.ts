import * as faker from 'faker'

const randomItem = (): RareItemObject => {
  if (faker.datatype.boolean()) {
    return []
  } else {
    return Array.from({ length: 5 }, () =>
      faker.datatype.number({ min: 100000, max: 999999 }),
    ).slice(faker.datatype.number({ min: 0, max: 5 }))
  }
}

export const randomItemData = (): RareItemData => {
  const randomAmount = faker.datatype.number({ min: 0, max: 20 })
  const rawItemData: RareItemData = {}
  for (let i = 0; i < randomAmount; i++) {
    rawItemData[faker.name.lastName()] = randomItem()
  }

  return rawItemData
}
