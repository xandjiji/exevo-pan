// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import { outfit, storeOutfit } from 'DataDictionary/dictionaries'
import { singleSampleFrom, samplesFrom } from '../../utils'

const allOutfits = [...outfit.outfits, ...storeOutfit.outfits]

export const randomOutfitId = (sex: boolean): string =>
  `${
    singleSampleFrom(allOutfits).id[sex ? 'female' : 'male']
  }_${faker.datatype.number({
    min: 0,
    max: 3,
  })}`

export const randomOutfits = (): Outfit[] =>
  samplesFrom(outfit.outfits, faker.datatype.number({ min: 8, max: 36 })).map(
    ({ name }) => ({ name, type: faker.datatype.number({ min: 0, max: 3 }) }),
  )

export const randomStoreOutfits = (): Outfit[] =>
  samplesFrom(
    storeOutfit.outfits,
    faker.datatype.number({ min: 0, max: 4 }),
  ).map(({ name }) => ({ name, type: 3 }))
