import {
  PaginationOptions,
  SortOptions,
  SerializedFilterOptions,
} from './types'

export const serializeBody = (
  paginationOptions: PaginationOptions,
  sortOptions: SortOptions,
  filterOptions?: FilterState,
): string => {
  if (filterOptions) {
    const serializedFilterState: SerializedFilterOptions = {
      ...filterOptions,
      vocation: [...filterOptions.vocation],
      pvp: [...filterOptions.pvp],
      battleye: [...filterOptions.battleye],
      location: [...filterOptions.location],
      serverSet: [...filterOptions.serverSet],
      skillKey: [...filterOptions.skillKey],
      imbuementsSet: [...filterOptions.imbuementsSet],
      itemSet: [...filterOptions.itemSet],
    }

    return JSON.stringify({
      paginationOptions,
      sortOptions,
      filterOptions: serializedFilterState,
    })
  }

  return JSON.stringify({ paginationOptions, sortOptions })
}
