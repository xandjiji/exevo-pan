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
  charmsSet: new Set([]),
  itemSet: new Set([]),
  rareNick: false,
  addon: 3,
  sex: false,
  questSet: new Set([]),
  outfitSet: new Set([]),
  mountSet: new Set([]),
  achievementSet: new Set([]),
  storeOutfitSet: new Set([]),
  storeMountSet: new Set([]),
  soulwarAvailable: false,
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
  charmsSet: [],
  itemSet: [],
  questSet: [],
  outfitSet: [],
  mountSet: [],
  achievementSet: [],
  storeOutfitSet: [],
  storeMountSet: [],
}
