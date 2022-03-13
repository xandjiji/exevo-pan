import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react'
import { urlParametersState } from 'utils'
import { filterSchema } from 'shared-utils/dist/contracts/Filters/schemas/filterUrl'
import { countActiveFilters } from './utils'
import FilterReducer from './reducer'
import { FiltersContextValues } from './types'

const {
  defaultValues: untypedDefaultValues,
  getUrlValues,
  setUrlValues,
} = urlParametersState(filterSchema)
const defaultValues = untypedDefaultValues as FilterOptions

const initialFilterState =
  (getUrlValues() as FilterOptions | undefined) ?? defaultValues

const DEFAULT_STATE: FiltersContextValues = {
  filterState: initialFilterState,
  defaultValues,
  activeFilterCount: countActiveFilters(defaultValues, initialFilterState),
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
    defaultValues: DEFAULT_STATE.defaultValues,
    activeFilterCount: DEFAULT_STATE.activeFilterCount,
  })

  useEffect(() => {
    setUrlValues(state.filterState)
  }, [state.filterState])

  const updateFilters = useCallback(
    (key: keyof FilterOptions, value: any) =>
      dispatch({ type: 'UPDATE_FILTER', key, value }),
    [],
  )

  const toggleAllOptions = useCallback(
    (key: keyof FilterOptions, allOptions: Option[]) =>
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
