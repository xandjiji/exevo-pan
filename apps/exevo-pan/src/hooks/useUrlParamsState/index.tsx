import { useState, useCallback } from 'react'
import { urlParametersStateFactory } from './utils'
import { SchemaCodec } from './types'

const useUrlParamsState = <T,>(schemaCodec: SchemaCodec<T>) => {
  const [{ get, set, isCurrentlyDefaultValues }] = useState(() =>
    urlParametersStateFactory(schemaCodec),
  )

  const [currentValues, setCurrentValues] = useState(get.urlValues)

  const setStateAndUrl: typeof setCurrentValues = useCallback(
    (stateDispatch) => {
      if (stateDispatch instanceof Function) {
        setCurrentValues((previousState) => {
          const returnedNewState = stateDispatch(previousState)
          set.urlValues(returnedNewState)
          return returnedNewState
        })
      } else {
        set.urlValues(stateDispatch)
        setCurrentValues(stateDispatch)
      }
    },
    [set.urlValues],
  )

  return [currentValues, setStateAndUrl, isCurrentlyDefaultValues()] as const
}

export default useUrlParamsState

export type { PropertyCodec, SchemaCodec } from './types'
export * as codecs from './codecs'
