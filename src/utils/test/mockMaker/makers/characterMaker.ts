// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import { unminifyCharacterData } from '../utils'

/* const randomMinifiedCharacter = (): MinifiedCharacterObject => [ */
const randomMinifiedCharacter = (): any => [
  faker.datatype.number({ min: 0, max: 999999 }),
  faker.name.firstName(),
  Math.trunc(+faker.date.future() / 1000),
  faker.datatype.number({ min: 58, max: 300000 }),
  faker.datatype.boolean(),
  `${faker.datatype.number({ min: 0, max: 130 })}_${faker.datatype.number({
    min: 0,
    max: 3,
  })}`,
  faker.datatype.number({ min: 0, max: 99 }),
  faker.datatype.number({ min: 0, max: 4 }),
  faker.datatype.number({ min: 8, max: 2000 }),
  Array.from({ length: 8 }, () =>
    faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
  ),
  Array.from({ length: 4 }, () =>
    faker.datatype.number({ min: 8, max: 50000 }),
  ).slice(faker.datatype.number({ min: 0, max: 4 })),
  [...Array(19).keys()].slice(faker.datatype.number({ min: 0, max: 19 })),
  faker.datatype.boolean(),
  [...Array(23).keys()].slice(faker.datatype.number({ min: 0, max: 23 })),
  faker.datatype.boolean(),
]

export const randomCharacterData = (
  amount: number,
): {
  /* minifiedCharacterData: MinifiedCharacterObject[] */
  minifiedCharacterData: any[]
  characterList: PartialCharacterObject[]
} => {
  /* const minifiedCharacterData: MinifiedCharacterObject[] = Array.from( */
  const minifiedCharacterData: any[] = Array.from({ length: amount }, () =>
    randomMinifiedCharacter(),
  )

  const sortedCharacterData = minifiedCharacterData.sort((a, b) => a[2] - b[2])

  const characterList: PartialCharacterObject[] =
    unminifyCharacterData(sortedCharacterData)
  return { minifiedCharacterData, characterList }
}
