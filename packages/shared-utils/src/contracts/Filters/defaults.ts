export const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  pageIndex: 0,
  pageSize: 10,
}

export const DEFAULT_SORT_OPTIONS: SortOptions = {
  sortingMode: 0,
  descendingOrder: false,
}

export const DEFAULT_FILTER_OPTIONS: FilterOptions = {
  auctionIds: new Set([]),
  nicknameFilter: '',
  vocation: new Set([]),
  pvp: new Set([]),
  battleye: new Set([]),
  location: new Set([]),
  serverSet: new Set([]),
  minLevel: 0,
  maxLevel: 3000,
  minSkill: 10,
  maxSkill: 150,
  bossPoints: 0,
  minCharmPoints: 0,
  maxCharmPoints: 999999,
  tcInvested: 0,
  tags: new Set([]),
  skillKey: new Set([]),
  imbuementsSet: new Set([]),
  charmsSet: new Set([]),
  rareNick: false,
  addon: 3,
  sex: false,
  questSet: new Set([]),
  outfitSet: new Set([]),
  mountSet: new Set([]),
  achievementSet: new Set([]),
  storeOutfitSet: new Set([]),
  storeMountSet: new Set([]),
  charmExpansion: false,
  preySlot: false,
  huntingSlot: false,
  rewardShrine: false,
  imbuementShrine: false,
  dummy: false,
  mailbox: false,
  goldPouch: false,
  hireling: false,
  transferAvailable: false,
  biddedOnly: false,
}
