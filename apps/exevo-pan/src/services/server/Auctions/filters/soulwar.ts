import { dictionary } from 'data-dictionary/dist/dictionaries/characterTags'
import { FilterQuery } from 'types/FilterQuery'

const SOULWAR = {
  MINIMUM_LEVEL: 250,
  OUTFIT_NAME: 'Revenant',
}

const filterQuery: FilterQuery = {
  filterSkip: ({ tags }) => !tags.has(dictionary.soulwarAvailable),
  addQuery: () => ({
    level: { gte: SOULWAR.MINIMUM_LEVEL },
    outfits: { none: { name: SOULWAR.OUTFIT_NAME } },
  }),
}

export default filterQuery
