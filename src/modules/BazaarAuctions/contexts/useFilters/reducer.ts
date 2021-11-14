import { toggleSet } from './utils'
import { FiltersContextState, Action } from './types'

const toggleFilterValue = (
  currentFilters: FilterState,
  key: keyof FilterState,
  value: any,
): FilterState => ({
  ...currentFilters,
  [key]: toggleSet(currentFilters[key] as Set<typeof value>, value),
})

const FilterReducer = (
  state: FiltersContextState,
  action: Action,
): FiltersContextState => {
  switch (action.type) {
    case 'UPDATE_FILTER': {
      if (state.filterState[action.key] instanceof Set) {
        return {
          ...state,
          filterState: toggleFilterValue(
            state.filterState,
            action.key,
            action.value,
          ),
        }
      }
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]: action.value,
        },
      }
    }

    default:
      return { ...state }
  }
}

export default FilterReducer
