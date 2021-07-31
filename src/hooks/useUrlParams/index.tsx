import { useState } from 'react'
import { urlParametersState } from 'utils'

export interface ParamRegister {
  key: string
  defaultValue: any
  encode?: (value: any) => string
  decode?: (value: string) => any
}

export type ParameterObject = Record<string, any>

export interface urlParameterStateObject {
  getUrlValues: () => ParameterObject
  setUrlValues: (newValues: ParameterObject) => void
  defaultValues: ParameterObject
}

const useUrlParams = (registeredParams: ParamRegister[]) => {
  const { getUrlValues, setUrlValues } = urlParametersState(registeredParams)

  const [currentValues, setCurrentValues] = useState(() => {
    setUrlValues(getUrlValues())
    return getUrlValues()
  })

  return [currentValues, setCurrentValues]
}

export default useUrlParams
