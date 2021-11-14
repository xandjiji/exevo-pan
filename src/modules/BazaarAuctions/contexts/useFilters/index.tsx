import { createContext, useContext, useReducer } from 'react'
import { urlParametersState } from 'utils'
import { filterSchema } from './schema'
import FilterReducer from './reducer'
import { FiltersContextValues } from './types'

const { defaultValues } = urlParametersState(filterSchema)

const DEFAULT_STATE: FiltersContextValues = {
  filterState: defaultValues as FilterState,
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

  return (
    <FiltersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = (): FiltersContextValues => useContext(FiltersContext)
