import { FilterQuery } from 'types/FilterQuery'

const rewardShrineSet = ['reward shrine', 'shiny reward shrine']

const filterQuery: FilterQuery = {
  filterSkip: ({ rewardShrine }) => !rewardShrine,
  addQuery: () => ({ storeItems: { some: { name: { in: rewardShrineSet } } } }),
}

export default filterQuery
