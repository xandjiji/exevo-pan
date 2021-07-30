import { ParamRegister, ParameterObject } from './types'

const getCurrentUrlParams = () => new URLSearchParams(window.location.search)

export function urlParametersState<T>(
  registeredParams: ParamRegister<T>[],
): [() => ParameterObject<T>, (newValues: ParameterObject<T>) => void] {
  const getUrlValues = (): ParameterObject<T> => {
    const urlParams = getCurrentUrlParams()

    const urlValues = {} as ParameterObject<T>
    for (const param of registeredParams) {
      const { key, decode, defaultValue } = param
      const urlEncodedValue = urlParams.get(param.key)
      urlValues[key] = urlEncodedValue ? decode(urlEncodedValue) : defaultValue
    }
    return urlValues
  }

  const setUrlValues = (newValues: ParameterObject<T>): void => {
    const urlParams = getCurrentUrlParams()

    for (const param of registeredParams) {
      const { key, encode, defaultValue } = param
      const value = newValues[key]

      if (value === defaultValue) {
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
