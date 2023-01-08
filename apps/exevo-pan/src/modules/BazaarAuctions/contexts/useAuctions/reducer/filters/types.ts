export type ExtractFilterByType<Type> = keyof FilterProperties<
  FilterOptions,
  Type
>

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
      filterOptions: Partial<FilterOptions>
    }
  | {
      type: 'SET_SIMILAR_FILTERS'
      filterOptions: Partial<FilterOptions>
    }
  | {
      type: 'TOGGLE_FILTER'
      key: ExtractFilterByType<boolean>
    }
  | ({
      type: 'TOGGLE_FILTER_SET'
    } & ToggleFilterSetArgs)
  | {
      type: 'TOGGLE_ALL_FILTER_SET_OPTION'
      key: ExtractFilterByType<Set<string>>
      allOptions: Option[]
    }
  | {
      type: 'TOGGLE_ADDON'
      value: number
    }
  | {
      type: 'RESET_FILTERS'
    }
  | {
      type: 'SET_DEFAULT'
      key: keyof FilterOptions
    }
