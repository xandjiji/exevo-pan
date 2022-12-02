import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { dictionary as tags } from 'data-dictionary/dist/dictionaries/characterTags'

export const pluckTCInvested = (auction: CharacterObject): CharacterObject =>
  auction.tcInvested > 0 ? { ...auction, tcInvested: -1 } : auction

export const pluckPremiumFilters = (
  filterOptions: FilterOptions,
): FilterOptions => ({
  ...filterOptions,
  sex: DEFAULT_FILTER_OPTIONS.sex,
  addon: DEFAULT_FILTER_OPTIONS.addon,
  outfitSet: DEFAULT_FILTER_OPTIONS.outfitSet,
  storeOutfitSet: DEFAULT_FILTER_OPTIONS.storeOutfitSet,
  mountSet: DEFAULT_FILTER_OPTIONS.mountSet,
  storeMountSet: DEFAULT_FILTER_OPTIONS.storeMountSet,
  tags: new Set(
    [...filterOptions.tags].filter((tag) => tag !== tags.soulwarAvailable),
  ),
  tcInvested: DEFAULT_FILTER_OPTIONS.tcInvested,
  auctionIds: DEFAULT_FILTER_OPTIONS.auctionIds,
})
