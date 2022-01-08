import { DEFAULT_SERIALIZED_FILTER_OPTIONS } from './defaults'

export const serializeBody = ({
  paginationOptions,
  sortOptions,
  filterOptions,
}: FilterBodyPayload): string => {
  const serializedFilterState: SerializedFilterOptions = {
    ...filterOptions,
    vocation: [...filterOptions.vocation],
    pvp: [...filterOptions.pvp],
    battleye: [...filterOptions.battleye],
    location: [...filterOptions.location],
    serverSet: [...filterOptions.serverSet],
    skillKey: [...filterOptions.skillKey],
    imbuementsSet: [...filterOptions.imbuementsSet],
    charmsSet: [...filterOptions.charmsSet],
    itemSet: [...filterOptions.itemSet],
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
  vocation,
  pvp,
  battleye,
  location,
  serverSet,
  skillKey,
  imbuementsSet,
  charmsSet,
  itemSet,
  questSet,
  outfitSet,
  storeOutfitSet,
  mountSet,
  storeMountSet,
  achievementSet,
  ...primitiveOptions
}: SerializedFilterOptions): FilterOptions => ({
  ...primitiveOptions,
  vocation: new Set<VocationOptions>(vocation as VocationOptions[]),
  pvp: new Set<PvpOptions>(pvp as PvpOptions[]),
  battleye: new Set<boolean>(battleye),
  location: new Set<LocationOptions>(location as LocationOptions[]),
  serverSet: new Set<string>(serverSet),
  skillKey: new Set<SkillOptions>(skillKey as SkillOptions[]),
  imbuementsSet: new Set<string>(imbuementsSet),
  charmsSet: new Set<string>(charmsSet),
  itemSet: new Set<string>(itemSet),
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
