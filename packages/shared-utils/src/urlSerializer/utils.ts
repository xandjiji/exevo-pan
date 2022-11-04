/* eslint-disable no-restricted-globals */
import { dequal } from 'dequal'
import {
  SerializeArgs,
  DeserializeArgs,
  SchemaCodec,
  PropertyCodec,
  UrlParameterStateMethods,
  SerializeFromSchemaArgs,
  DeserializeFromSchemaArgs,
} from './types'

const isServer = () => typeof window === 'undefined'

export const serializeUrlParams = <T>({
  values,
  schema,
  currentParams = new URLSearchParams(),
}: SerializeArgs<T>): string => {
  Object.entries(values).forEach((entry) => {
    const [property, newValue] = entry as [keyof T, T[keyof T]]

    const { urlKey, defaultValue, encode } = schema[property]

    if (newValue !== null && newValue !== undefined) {
      if (dequal(newValue, defaultValue)) {
        currentParams.delete(urlKey)
      } else {
        currentParams.set(
          urlKey,
          encode
            ? encode(newValue)
            : encodeURIComponent(
                newValue as unknown as 'boolean' | 'number' | 'string',
              ),
        )
      }
    }
  })

  return currentParams.toString()
}

export const deserializeUrlParams = <T>({
  schema,
  currentParams,
}: DeserializeArgs<T>): T => {
  const values = {} as T

  Object.entries(schema).forEach((entry) => {
    const [property, { urlKey, defaultValue, decode }] = entry as [
      keyof T,
      PropertyCodec<unknown>,
    ]

    const urlEncodedValue = currentParams.get(urlKey)

    if (urlEncodedValue === null) {
      values[property] = defaultValue as T[keyof T]
    } else {
      values[property] = (
        decode ? decode(urlEncodedValue) : decodeURIComponent(urlEncodedValue)
      ) as T[keyof T]
    }
  })

  return values
}

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

      return deserializeUrlParams({
        schema,
        currentParams: getCurrentUrlParams(),
      })
    },
  }

  const set = {
    urlValues: (newValues: Partial<T>): void => {
      const serializedParams = serializeUrlParams({
        schema,
        values: newValues,
        currentParams: getCurrentUrlParams(),
      })

      history.replaceState(
        {},
        '',
        `${window.location.pathname}${
          serializedParams ? `?${serializedParams}` : ''
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

export const buildFromSchema = {
  serializer:
    <T>(schema: SchemaCodec<T>) =>
    (args: SerializeFromSchemaArgs<T>): string =>
      serializeUrlParams({ schema, ...args }),
  deserializer:
    <T>(schema: SchemaCodec<T>) =>
    (args: DeserializeFromSchemaArgs<T>): T =>
      deserializeUrlParams({ schema, ...args }),
}
