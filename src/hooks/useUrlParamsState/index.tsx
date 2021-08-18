import { useState, useMemo, useCallback } from 'react'
import { urlParametersState } from 'utils'
import { ParamRegister } from 'utils/urlParameterState/types'
import { UseUrlParamsGetterSetter } from './types'

/* @ ToDo: fix this typings */
const useUrlParamsState = (
  registeredParams: ParamRegister[],
): UseUrlParamsGetterSetter => {
  const { getUrlValues, setUrlValues } = useMemo(
    () => urlParametersState(registeredParams),
    [registeredParams],
  )

  const [currentValues, setCurrentValues] = useState(getUrlValues)

  const setStateAndUrl = useCallback(
    (
      newState:
        | typeof currentValues
        | ((previousState: typeof currentValues) => typeof currentValues),
    ) => {
      if (newState instanceof Function) {
        setCurrentValues((previousState) => {
          const returnedNewState = newState(previousState)
          setUrlValues(returnedNewState)
          return returnedNewState
        })
      } else {
        setUrlValues(newState)
        setCurrentValues(newState)
      }
    },
    [setUrlValues],
  )

  return [currentValues, setStateAndUrl]
}

export default useUrlParamsState
