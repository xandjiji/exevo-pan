import { toggleFilterValue, countActiveFilters } from './utils'
import { FiltersContextState, Action } from './types'

const updateFiltersReducer = (
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

    case 'TOGGLE_ADDON': {
      const { addon } = state.filterState
      const { value } = action

      return {
        ...state,
        filterState: {
          ...state.filterState,
          addon: addon === 3 || addon === value ? addon - value : addon + value,
        },
      }
    }

    case 'RESET_FILTERS':
      return {
        ...state,
        filterState: { ...state.defaultValues },
      }

    default:
      return { ...state }
  }
}

const FilterReducer = (
  state: FiltersContextState,
  action: Action,
): FiltersContextState => {
  const newFilterState = updateFiltersReducer(state, action)

  const activeFilterCount = countActiveFilters(
    newFilterState.defaultValues,
    newFilterState.filterState,
  )

  return {
    ...newFilterState,
    activeFilterCount,
  }
}

export default FilterReducer
