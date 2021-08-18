/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { dequal } from 'dequal'
import {
  ParamRegister,
  ParameterObject,
  urlParameterStateObject,
} from './types'

const getCurrentUrlParams = () => new URLSearchParams(window.location.search)

/* @ ToDo: fix this typings */
export function urlParametersState(
  registeredParams: ParamRegister[],
): urlParameterStateObject {
  const getUrlValues = (): ParameterObject => {
    const urlParams = getCurrentUrlParams()

    const urlValues = {} as ParameterObject
    registeredParams.forEach((param) => {
      const { key, decode, defaultValue } = param
      const urlEncodedValue = urlParams.get(param.key)
      if (urlEncodedValue === null) {
        urlValues[key] = defaultValue
      } else {
        urlValues[key] = decode
          ? decode(urlEncodedValue)
          : decodeURIComponent(urlEncodedValue)
      }
    })
    return urlValues
  }

  const setUrlValues = (newValues: ParameterObject): void => {
    const urlParams = getCurrentUrlParams()

    registeredParams.forEach((param) => {
      const { key, encode, defaultValue } = param
      const value = newValues[key]

      if (value !== null && value !== undefined) {
        if (dequal(value, defaultValue)) {
          urlParams.delete(key)
        } else {
          urlParams.set(
            key,
            encode
              ? encode(value)
              : encodeURIComponent(value as 'boolean' | 'number' | 'string'),
          )
        }
      }
    })

    const newParamString = urlParams.toString()
    history.replaceState(
      {},
      '',
      `${window.location.pathname}${
        newParamString ? `?${newParamString}` : ''
      }`,
    )
  }

  function getDefaultValues(): ParameterObject {
    const defaultValues = {} as ParameterObject

    registeredParams.forEach((param) => {
      const { key, defaultValue } = param
      defaultValues[key] = defaultValue
    })

    return defaultValues
  }

  return { getUrlValues, setUrlValues, defaultValues: getDefaultValues() }
}
