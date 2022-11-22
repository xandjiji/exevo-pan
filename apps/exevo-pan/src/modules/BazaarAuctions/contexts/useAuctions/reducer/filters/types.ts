type ExtractFilterByType<Type> = keyof FilterProperties<FilterOptions, Type>

type ToggleFilterSetArgs =
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

export type FilterAction =
  | {
      type: 'SET_FILTERS'
      filterOptions: Partial<SortOptions>
    }
  | {
      type: 'TOGGLE_FILTER_SET'
      toggleFilter: ToggleFilterSetArgs
    }
