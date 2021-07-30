/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { dequal } from 'dequal'
import { ParamRegister, ParameterObject } from './types'

const getCurrentUrlParams = () => new URLSearchParams(window.location.search)

export function urlParametersState(
  registeredParams: ParamRegister[],
): [() => ParameterObject, (newValues: ParameterObject) => void] {
  const getUrlValues = (): ParameterObject => {
    const urlParams = getCurrentUrlParams()

    const urlValues = {} as ParameterObject
    for (const param of registeredParams) {
      const { key, decode, defaultValue } = param
      const urlEncodedValue = urlParams.get(param.key)
      urlValues[key] = urlEncodedValue ? decode(urlEncodedValue) : defaultValue
    }
    return urlValues
  }

  const setUrlValues = (newValues: ParameterObject): void => {
    const urlParams = getCurrentUrlParams()

    for (const param of registeredParams) {
      const { key, encode, defaultValue } = param
      const value = newValues[key]

      if (dequal(value, defaultValue)) {
        urlParams.delete(key)
      } else {
        urlParams.set(key, encode(value))
      }
    }

    const newParamString = urlParams.toString()
    history.replaceState(
      {},
      '',
      `${window.location.pathname}${
        newParamString ? `?${newParamString}` : ''
      }`,
    )
  }

  return [getUrlValues, setUrlValues]
}
