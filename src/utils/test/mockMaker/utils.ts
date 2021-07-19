import * as faker from 'faker'

export function singleSampleFrom<T>(array: Array<T>): T {
  return array[faker.datatype.number({ min: 0, max: array.length - 1 })]
}
