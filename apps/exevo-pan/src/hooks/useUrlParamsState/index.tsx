import { useState, useCallback } from 'react'
import { urlParametersState } from 'utils'
import { ParamRegister } from 'utils/urlParameterState/types'

/* @ ToDo: fix this typings */
const useUrlParamsState = (registeredParams: ParamRegister<any>[]) => {
  const [{ getUrlValues, setUrlValues }] = useState(() =>
    urlParametersState(registeredParams),
  )

  const [currentValues, setCurrentValues] = useState(getUrlValues)

  const setStateAndUrl: typeof setCurrentValues = useCallback(
    (stateDispatch) => {
      if (stateDispatch instanceof Function) {
        setCurrentValues((previousState) => {
          const returnedNewState = stateDispatch(previousState)
          setUrlValues(returnedNewState)
          return returnedNewState
        })
      } else {
        setUrlValues(stateDispatch)
        setCurrentValues(stateDispatch)
      }
    },
    [setUrlValues],
  )

  return [currentValues, setStateAndUrl] as const
}

export default useUrlParamsState
