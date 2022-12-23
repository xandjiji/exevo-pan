import { dictionary } from 'data-dictionary/dist/dictionaries/characterTags'

const SOULWAR = {
  MINIMUM_LEVEL: 250,
  OUTFIT_NAME: 'Revenant',
}

const filterSkip: FilterSkip = ({ tags }): boolean =>
  !tags.has(dictionary.soulwarAvailable)

const filterTest: FilterTest =
  () =>
  ({ level, outfits }): boolean =>
    level >= SOULWAR.MINIMUM_LEVEL &&
    !outfits.some(({ name }) => name === SOULWAR.OUTFIT_NAME)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
