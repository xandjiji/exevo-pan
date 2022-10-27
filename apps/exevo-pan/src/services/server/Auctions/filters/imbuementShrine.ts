import { FilterQuery } from 'types/FilterQuery'

const imbuementShrines = ['imbuing shrine', 'gilded imbuing shrine']

const filterQuery: FilterQuery = {
  filterSkip: ({ imbuementShrine }) => !imbuementShrine,
  addQuery: () => ({
    storeItems: { some: { name: { in: imbuementShrines } } },
  }),
}

export default filterQuery
