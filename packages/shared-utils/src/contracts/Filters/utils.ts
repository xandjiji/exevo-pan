import { DEFAULT_SERIALIZED_FILTER_OPTIONS } from './defaults'

export const serializeBody = ({
  paginationOptions,
  sortOptions,
  filterOptions,
}: FilterBodyPayload): string => {
  const serializedFilterState: SerializedFilterOptions = {
    ...filterOptions,
    auctionIds: [...filterOptions.auctionIds],
    vocation: [...filterOptions.vocation],
    pvp: [...filterOptions.pvp],
    battleye: [...filterOptions.battleye],
    location: [...filterOptions.location],
    serverSet: [...filterOptions.serverSet],
    tags: [...filterOptions.tags],
    skillKey: [...filterOptions.skillKey],
    imbuementsSet: [...filterOptions.imbuementsSet],
    charmsSet: [...filterOptions.charmsSet],
    questSet: [...filterOptions.questSet],
    outfitSet: [...filterOptions.outfitSet],
    mountSet: [...filterOptions.mountSet],
    storeOutfitSet: [...filterOptions.storeOutfitSet],
    storeMountSet: [...filterOptions.storeMountSet],
    achievementSet: [...filterOptions.achievementSet],
  }

  return JSON.stringify({
    paginationOptions,
    sortOptions,
    filterOptions: serializedFilterState,
  })
}

const deserializeFilterOptions = ({
  auctionIds,
  vocation,
  pvp,
  battleye,
  location,
  serverSet,
  tags,
  skillKey,
  imbuementsSet,
  charmsSet,
  questSet,
  outfitSet,
  storeOutfitSet,
  mountSet,
  storeMountSet,
  achievementSet,
  ...primitiveOptions
}: SerializedFilterOptions): FilterOptions => ({
  ...primitiveOptions,
  auctionIds: new Set<number>(auctionIds),
  vocation: new Set<number>(vocation),
  pvp: new Set<number>(pvp),
  battleye: new Set<boolean>(battleye),
  location: new Set<number>(location),
  serverSet: new Set<string>(serverSet),
  tags: new Set<string>(tags),
  skillKey: new Set<string>(skillKey),
  imbuementsSet: new Set<string>(imbuementsSet),
  charmsSet: new Set<string>(charmsSet),
  questSet: new Set<string>(questSet),
  outfitSet: new Set<string>(outfitSet),
  storeOutfitSet: new Set<string>(storeOutfitSet),
  mountSet: new Set<string>(mountSet),
  storeMountSet: new Set<string>(storeMountSet),
  achievementSet: new Set<string>(achievementSet),
})

export const deserializeBody = ({
  paginationOptions,
  sortOptions,
  filterOptions,
}: SerializedFilterBody): FilterBodyPayload => ({
  paginationOptions,
  sortOptions,
  filterOptions: deserializeFilterOptions(
    filterOptions ?? DEFAULT_SERIALIZED_FILTER_OPTIONS,
  ),
})
