/* eslint-disable no-restricted-globals */
import { dequal } from 'dequal'
import { isServer } from 'utils'
import { SchemaCodec, PropertyCodec, UrlParameterStateMethods } from './types'

const getCurrentUrlParams = () => new URLSearchParams(window.location.search)

export function urlParametersStateFactory<T>(
  schema: SchemaCodec<T>,
): UrlParameterStateMethods<T> {
  const defaultValues = (): T => {
    const values = {} as T
    Object.entries(schema).forEach((entry) => {
      const [property, propertyCodec] = entry as [
        keyof T,
        PropertyCodec<unknown>,
      ]

      values[property] = propertyCodec.defaultValue as T[keyof T]
    })

    return values
  }

  const get = {
    defaultValues,
    urlValues: (): T => {
      if (isServer()) return defaultValues()

      const urlParams = getCurrentUrlParams()

      const values = {} as T

      Object.entries(schema).forEach((entry) => {
        const [property, { urlKey, defaultValue, decode }] = entry as [
          keyof T,
          PropertyCodec<unknown>,
        ]

        const urlEncodedValue = urlParams.get(urlKey)

        if (urlEncodedValue === null) {
          values[property] = defaultValue as T[keyof T]
        } else {
          values[property] = (
            decode
              ? decode(urlEncodedValue)
              : decodeURIComponent(urlEncodedValue)
          ) as T[keyof T]
        }
      })

      return values
    },
  }

  const set = {
    urlValues: (newValues: Partial<T>): void => {
      const urlParams = getCurrentUrlParams()

      Object.entries(newValues).forEach((entry) => {
        const [property, newValue] = entry as [keyof T, T[keyof T]]

        const { urlKey, defaultValue, encode } = schema[property]

        if (newValue !== null && newValue !== undefined) {
          if (dequal(newValue, defaultValue)) {
            urlParams.delete(urlKey)
          } else {
            urlParams.set(
              urlKey,
              encode
                ? encode(newValue)
                : encodeURIComponent(
                    newValue as 'boolean' | 'number' | 'string',
                  ),
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
    },
  }

  const isCurrentlyDefaultValues = (): boolean =>
    dequal(get.defaultValues(), get.urlValues())

  return {
    get,
    set,
    isCurrentlyDefaultValues,
    defaultValues: get.defaultValues(),
  }
}
