import { FilterQuery } from 'types/FilterQuery'

const addonSet: Record<number, number[]> = {
  0: [0, 1, 2, 3],
  1: [1, 3],
  2: [2, 3],
  3: [3],
}

const filterQuery: FilterQuery = {
  filterSkip: ({ outfitSet }) => outfitSet.size === 0,
  addQuery: ({ outfitSet, sex, addon }) => ({
    sex,
    AND: [...outfitSet].map((name) => ({
      outfits: {
        some: {
          name,
          type: { in: addonSet[addon] ?? [] },
        },
      },
    })),
  }),
}

export default filterQuery
