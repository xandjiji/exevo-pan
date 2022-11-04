export type ExtractFilterByType<Type> = keyof FilterProperties<
  FilterOptions,
  Type
>

export type ToggleFilterSetArgs =
  | {
      key: ExtractFilterByType<Set<string>>
      value: string
    }
  | {
      key: ExtractFilterByType<Set<number>>
      value: number
    }
  | {
      key: ExtractFilterByType<Set<boolean>>
      value: boolean
    }

type SetFilterOptions = FilterProperties<FilterOptions, Set<any>>

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
