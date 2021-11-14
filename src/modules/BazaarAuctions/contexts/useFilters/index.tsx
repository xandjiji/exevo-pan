import { createContext, useContext, useReducer, useCallback } from 'react'
import { urlParametersState } from 'utils'
import { filterSchema } from './schema'
import FilterReducer from './reducer'
import { FiltersContextValues } from './types'

const { defaultValues } = urlParametersState(filterSchema)

const DEFAULT_STATE: FiltersContextValues = {
  filterState: defaultValues as FilterState,
  updateFilters: () => {},
  toggleAllOptions: () => {},
  dispatch: () => {},
}

const FiltersContext = createContext<FiltersContextValues>(DEFAULT_STATE)

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [state, dispatch] = useReducer(FilterReducer, {
    filterState: DEFAULT_STATE.filterState,
  })

  const updateFilters = useCallback(
    (key: keyof FilterState, value: any) =>
      dispatch({ type: 'UPDATE_FILTER', key, value }),
    [],
  )

  const toggleAllOptions = useCallback(
    (key: keyof FilterState, allOptions: Option[]) =>
      dispatch({ type: 'TOGGLE_ALL_OPTIONS', key, allOptions }),
    [],
  )

  return (
    <FiltersContext.Provider
      value={{ ...state, updateFilters, toggleAllOptions, dispatch }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = (): FiltersContextValues => useContext(FiltersContext)
