import { FilterQuery } from 'types/FilterQuery'

const GOLD_POUCH = 'gold pouch'

const filterQuery: FilterQuery = {
  filterSkip: ({ goldPouch }) => !goldPouch,
  addQuery: () => ({ storeItems: { some: { name: GOLD_POUCH } } }),
}

export default filterQuery
