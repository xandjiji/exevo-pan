/* eslint-disable no-restricted-globals */
import { isServer } from 'utils'
import { defaultDecode, defaultEncode } from './codecs'
import { RegisteredParameter } from './types'

const getCurrentUrlParams = () => new URLSearchParams(window.location.search)

const getUrlState = <T>({
  key,
  defaultValue,
  decode,
}: RegisteredParameter<T>): T => {
  if (isServer()) return defaultValue

  const params = getCurrentUrlParams()
  const encodedValue = params.get(key)

  if (encodedValue === null) return defaultValue
  return decode
    ? decode(encodedValue)
    : defaultDecode(encodedValue, defaultValue)
}

const setUrlState = <T>(
  value: T,
  { key, defaultValue, encode }: RegisteredParameter<T>,
): void => {
  if (isServer()) return

  const params = getCurrentUrlParams()

  if (value === defaultValue) {
    params.delete(key)
  } else {
    params.set(key, encode ? encode(value) : defaultEncode(value))
  }

  const parametersString = params.toString()
  history.replaceState(
    {},
    '',
    `${window.location.pathname}${
      parametersString ? `?${parametersString}` : ''
    }`,
  )
}

export const urlState = {
  get: getUrlState,
  set: setUrlState,
}
