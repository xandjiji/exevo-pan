// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import { minifiedToObject } from 'utils/dataDictionary'

export function singleSampleFrom<T>(array: Array<T>): T {
  return array[faker.datatype.number({ min: 0, max: array.length - 1 })]
}

export const unminifyCharacterData = (
  initialCharacterData: MinifiedCharacterObject[],
): PartialCharacterObject[] =>
  initialCharacterData.map(
    minifiedToObject,
  ) as unknown as PartialCharacterObject[]

export const filterItemData = (initialItemData: RareItemData): RareItemData => {
  const filteredItemData = {} as RareItemData

  Object.keys(initialItemData).forEach((item) => {
    if (initialItemData[item].length > 0) {
      filteredItemData[item] = initialItemData[item]
    }
  })

  return filteredItemData
}
