import {
  applySort as baseSort,
  filterCharacters as baseFilter,
} from 'auction-queries'
import {
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SERIALIZED_FILTER_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { broadcast, TrackETA } from 'logging'
import Cache from './Data/cache'

export const applySort: typeof baseSort = (
  oldData,
  sortOptions = DEFAULT_SORT_OPTIONS,
) => {
  const cachedSort = Cache.getSortCache(sortOptions)
  if (cachedSort) {
    return cachedSort
  }

  broadcast('Sort result was cached', 'neutral')
  const result = baseSort(oldData, sortOptions)
  Cache.setSortCache(sortOptions, result)
  return result
}

type FilterCharactersOptions = {
  auctions: CharacterObject[]
  filters: FilterOptions
}

export interface FilterCharacterProps extends FilterCharactersOptions {
  serializedFilterOptions?: SerializedFilterOptions | undefined
  sortOptions: SortOptions
}

export const filterCharacters = ({
  serializedFilterOptions = DEFAULT_SERIALIZED_FILTER_OPTIONS,
  sortOptions,
  ...options
}: FilterCharacterProps): CharacterObject[] => {
  const cachedResponse = Cache.getFilterCache(
    serializedFilterOptions,
    sortOptions,
  )

  if (cachedResponse) {
    broadcast('Filter cache hit', 'success')
    return cachedResponse
  }

  broadcast('Filter result was cached', 'neutral')
  const result = baseFilter(options)
  Cache.setFilterCache(serializedFilterOptions, sortOptions, result)

  return result
}

export const preloadCache = (auctions: CharacterObject[]): void => {
  broadcast('Preloading cache....', 'neutral')

  const sortingModes = [0, 1, 2, 3]
  const descendingOrders = [false, true]

  const OPERATIONS = sortingModes.length * descendingOrders.length
  const task = new TrackETA(OPERATIONS, 'Preloading Cache')

  sortingModes.forEach((sortingMode) => {
    descendingOrders.forEach((descendingOrder) => {
      task.incTask()

      const sortOptions: SortOptions = { sortingMode, descendingOrder }
      const sortedAuctions = applySort(auctions, sortOptions)
      filterCharacters({
        serializedFilterOptions: DEFAULT_SERIALIZED_FILTER_OPTIONS,
        sortOptions,
        auctions: sortedAuctions,
        filters: DEFAULT_FILTER_OPTIONS,
      })
    })
  })
  task.finish()
}
