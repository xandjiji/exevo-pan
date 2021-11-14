export type Action =
  | {
      type: 'UPDATE_FILTER'
      key: keyof FilterState
      value: any
    }
  | {
      type: 'TOGGLE_ALL_OPTIONS'
      key: keyof FilterState
      allOptions: Option[]
    }

export interface FiltersContextState {
  filterState: FilterState
  defaultValues: FilterState
  activeFilterCount: number
}

export interface FiltersContextValues extends FiltersContextState {
  updateFilters: (key: keyof FilterState, value: any) => void
  toggleAllOptions: (key: keyof FilterState, allOptions: Option[]) => void
  dispatch: React.Dispatch<Action>
}
