import { FiltersContextState, Action } from './types'

const FilterReducer = (
  state: FiltersContextState,
  action: Action,
): FiltersContextState => {
  switch (action.type) {
    /* case 'SET_LOADING':
      return { ...state, loading: action.value } */

    default:
      return { ...state }
  }
}

export default FilterReducer
