export type Action =
  | {
      type: 'UPDATE_FILTER'
      key: keyof FilterOptions
      value: any
    }
  | {
      type: 'TOGGLE_ALL_OPTIONS'
      key: keyof FilterOptions
      allOptions: Option[]
    }
  | {
      type: 'TOGGLE_ADDON'
      value: number
    }
  | {
      type: 'RESET_FILTERS'
    }

export interface FiltersContextState {
  filterState: FilterOptions
  defaultValues: FilterOptions
  activeFilterCount: number
}

export interface FiltersContextValues extends FiltersContextState {
  updateFilters: (key: keyof FilterOptions, value: any) => void
  toggleAllOptions: (key: keyof FilterOptions, allOptions: Option[]) => void
  dispatch: React.Dispatch<Action>
}
