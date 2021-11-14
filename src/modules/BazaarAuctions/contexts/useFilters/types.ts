export type Action = {
  type: 'UPDATE_FILTER'
  key: keyof FilterState
  value: any
}

export interface FiltersContextState {
  filterState: FilterState
}

export interface FiltersContextValues extends FiltersContextState {
  updateFilters: (key: keyof FilterState, value: any) => void
  dispatch: React.Dispatch<Action>
}
