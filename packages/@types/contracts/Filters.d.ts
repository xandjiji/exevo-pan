declare type PaginationOptions = {
  pageIndex: number
  pageSize: number
}

declare type SortOptions = {
  sortingMode: number
  descendingOrder: boolean
}

declare type FilterBodyPayload = {
  paginationOptions: PaginationOptions
  sortOptions: SortOptions
  filterOptions: FilterOptions
}

type FilterOptionsPrimitives = Pick<
  FilterOptions,
  | 'nicknameFilter'
  | 'minPrice'
  | 'maxPrice'
  | 'minLevel'
  | 'maxLevel'
  | 'minSkill'
  | 'maxSkill'
  | 'rareNick'
  | 'addon'
  | 'sex'
  | 'soulwarAvailable'
  | 'charmExpansion'
  | 'preySlot'
  | 'huntingSlot'
  | 'rewardShrine'
  | 'imbuementShrine'
  | 'dummy'
  | 'mailbox'
  | 'goldPouch'
  | 'hireling'
  | 'transferAvailable'
>

declare interface SerializedFilterOptions extends FilterOptionsPrimitives {
  vocation: number[]
  pvp: number[]
  battleye: boolean[]
  location: number[]
  serverSet: string[]
  skillKey: string[]
  imbuementsSet: string[]
  charmsSet: string[]
  itemSet: string[]
  questSet: string[]
  outfitSet: string[]
  storeOutfitSet: string[]
  mountSet: string[]
  storeMountSet: string[]
  achievementSet: string[]
}

declare interface SerializedFilterBody {
  paginationOptions: PaginationOptions
  sortOptions: SortOptions
  filterOptions: SerializedFilterOptions
}

declare type FilterResponse = PaginatedData<CharacterObject>
