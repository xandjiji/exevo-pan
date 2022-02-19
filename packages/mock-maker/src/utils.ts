import * as faker from 'faker'
import { Quantity } from './types'

export function singleSampleFrom<T>(array: Array<T>): T {
  return array[faker.datatype.number({ min: 0, max: array.length - 1 })]
}

export const samplesFrom = <T>(
  array: Array<T>,
  fixedAmount?: number,
): Array<T> => {
  const randomAmount = faker.datatype.number({
    min: 1,
    max: fixedAmount ?? array.length,
  })
  const shuffledArray = faker.helpers.shuffle(array)
  return shuffledArray.slice(0, randomAmount)
}

export const randomChance = (percentageChance: number): boolean =>
  percentageChance >= Math.random()

export const randomQuantity = (quantity: Quantity): number =>
  faker.datatype.number(quantity)

export const randomArrayFrom = <T>(quantity: Quantity, fn: () => T): T[] =>
  Array.from({ length: randomQuantity(quantity) }, fn)
