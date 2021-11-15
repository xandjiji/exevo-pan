export type PaginationOptions = {
  pageIndex?: number
  pageSize?: number
}

export type SortOptions = {
  sortingMode: number
  descendingOrder: boolean
}

type FilterOptionsPrimitives = Pick<
  FilterState,
  | 'nicknameFilter'
  | 'minLevel'
  | 'maxLevel'
  | 'minSkill'
  | 'rareNick'
  | 'soulwarFilter'
>

export interface SerializedFilterOptions extends FilterOptionsPrimitives {
  vocation: number[]
  pvp: number[]
  battleye: boolean[]
  location: number[]
  serverSet: string[]
  skillKey: string[]
  imbuementsSet: string[]
  itemSet: string[]
}

export interface FetchAuctionPageParameters {
  paginationOptions: PaginationOptions
  sortOptions: SortOptions
  filterOptions?: FilterState
}

export type CacheObject = Record<string, PaginatedData<CharacterObject>>
