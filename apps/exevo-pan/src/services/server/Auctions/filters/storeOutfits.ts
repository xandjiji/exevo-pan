import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ storeOutfitSet }) => storeOutfitSet.size === 0,
  addQuery: ({ storeOutfitSet, sex }) => ({
    sex,
    AND: [...storeOutfitSet].map((name) => ({
      storeOutfits: { some: { name } },
    })),
  }),
}

export default filterQuery
