import { toggleSet } from './utils'
import { FiltersContextState, Action } from './types'

/*
    @ ToDo:
    - wrapper filterCount e isFilterReset
    - resetar filters
    - resetar com pathname
    - sincronizar url state
    - debounced
*/

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
    case 'UPDATE_FILTER':
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

    case 'TOGGLE_ALL_OPTIONS':
      if (
        (state.filterState[action.key] as Set<string>).size ===
        action.allOptions.length
      ) {
        return {
          ...state,
          filterState: {
            ...state.filterState,
            [action.key]: new Set([]),
          },
        }
      }
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]: new Set([
            ...action.allOptions.map((option) => option.value),
          ]),
        },
      }

    default:
      return { ...state }
  }
}

export default FilterReducer
