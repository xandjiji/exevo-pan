export type SetFilterOptions = Pick<
  FilterOptions,
  | 'auctionIds'
  | 'vocation'
  | 'pvp'
  | 'battleye'
  | 'location'
  | 'serverSet'
  | 'tags'
  | 'skillKey'
  | 'imbuementsSet'
  | 'charmsSet'
  | 'questSet'
  | 'outfitSet'
  | 'storeOutfitSet'
  | 'mountSet'
  | 'storeMountSet'
  | 'achievementSet'
  | 'rareItemSet'
>

export type ExtractFilterSetByType<Type> = keyof FilterProperties<
  SetFilterOptions,
  Set<Type>
>

export type ToggleFilterSetArgs =
  | {
      key: ExtractFilterSetByType<string>
      value: string
    }
  | {
      key: ExtractFilterSetByType<number>
      value: number
    }
  | {
      key: ExtractFilterSetByType<boolean>
      value: boolean
    }

export type FiltersContextValues = {
  filterState: FilterOptions
  defaultValues: FilterOptions
  activeFilterCount: number
  setFilters: (newValues: Partial<FilterOptions>) => void
  toggleFilterSet: ({ key, value }: ToggleFilterSetArgs) => void
  toggleAllFilterSetOptions: <
    SetKey extends KeysOfType<SetFilterOptions, Set<string>>,
  >(
    key: SetKey,
    allOptions: Option[],
  ) => void
  toggleAddon: (value: number) => void
  resetFilters: () => void
}
