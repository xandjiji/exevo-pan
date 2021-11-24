import { endpoints } from 'Constants'
import { PaginationOptions, SortOptions } from './types'

export const serializeBody = (
  paginationOptions: PaginationOptions,
  sortOptions: SortOptions,
  filterOptions: FilterState,
): string => {
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

export const buildHeaders = (endpoint: string): Headers => {
  const headers = new Headers()
  if (endpoint === endpoints.HISTORY_AUCTIONS) {
    headers.set('Content-Type', 'application/json')
  }
  return headers
}
