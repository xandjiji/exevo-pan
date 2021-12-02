import { PaginationOptions, SortOptions } from './types'

export const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  pageIndex: 0,
  pageSize: 10,
}

export const DEFAULT_SORT_OPTIONS: SortOptions = {
  sortingMode: 0,
  descendingOrder: false,
}

export const DEFAULT_FILTER_STATE: FilterState = {
  nicknameFilter: '',
  vocation: new Set([]),
  pvp: new Set([]),
  battleye: new Set([]),
  location: new Set([]),
  serverSet: new Set([]),
  minLevel: 8,
  maxLevel: 2000,
  minSkill: 10,
  maxSkill: 150,
  skillKey: new Set([]),
  imbuementsSet: new Set([]),
  itemSet: new Set([]),
  rareNick: false,
  soulwarFilter: false,
}

export const DEFAULT_SERIALIZED_FILTER_STATE: SerializedFilterOptions = {
  ...DEFAULT_FILTER_STATE,
  vocation: [],
  pvp: [],
  battleye: [],
  location: [],
  serverSet: [],
  skillKey: [],
  imbuementsSet: [],
  itemSet: [],
}
