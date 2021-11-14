export type Action = {
  type: 'SET_LOADING'
  value: boolean
}

export interface FiltersContextState {
  filterState: FilterState
}

export interface FiltersContextValues extends FiltersContextState {
  dispatch: React.Dispatch<Action>
}
