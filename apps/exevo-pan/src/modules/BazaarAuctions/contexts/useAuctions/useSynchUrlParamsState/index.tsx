import { useState, useEffect } from 'react'
import { urlParametersStateFactory } from 'shared-utils/dist/urlSerializer'
import { useIsMounted } from 'hooks'
import { UseSynchUrlParamsStateProps } from './types'

const useUrlParamsState = <T,>({
  schemaCodec,
  currentState,
}: UseSynchUrlParamsStateProps<T>) => {
  const [{ get, set, isCurrentlyDefaultValues }] = useState(() =>
    urlParametersStateFactory(schemaCodec),
  )

  const [initialValues] = useState(get.urlValues)
  const [isInitiallyDefault] = useState(isCurrentlyDefaultValues)

  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) set.urlValues(currentState)
    console.log(currentState)
  }, [currentState])

  return [initialValues, isInitiallyDefault] as const
}

export default useUrlParamsState
