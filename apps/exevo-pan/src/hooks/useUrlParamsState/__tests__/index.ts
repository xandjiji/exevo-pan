import { urlParametersStateFactory } from '../utils'
import { SchemaCodec } from '../types'

const mockSchema: SchemaCodec<{
  itemA: string
  itemB: string
}> = {
  itemA: {
    urlKey: 'itemA',
    defaultValue: 'default value for,A',
  },
  itemB: {
    urlKey: 'itemB',
    defaultValue: 'default value for,B',
  },
}

describe('urlParameterState', () => {
  test('should have correct default values', () => {
    const { defaultValues } = urlParametersStateFactory(mockSchema)

    expect(defaultValues).toEqual({
      itemA: 'default value for,A',
      itemB: 'default value for,B',
    })
  })

  test('getUrlValues should have correct values', () => {
    const { get } = urlParametersStateFactory(mockSchema)

    expect(get.defaultValues()).toEqual({
      itemA: 'default value for,A',
      itemB: 'default value for,B',
    })
  })

  test('setUrlValues should set values correctly', () => {
    const { set, get } = urlParametersStateFactory(mockSchema)

    set.urlValues({ itemA: 'new value for+A' })
    expect(get.urlValues()).toEqual({
      itemA: 'new value for+A',
      itemB: 'default value for,B',
    })

    set.urlValues({
      itemA: 'yet another new value A',
      itemB: 'yet another new value B',
    })

    expect(get.urlValues()).toEqual({
      itemA: 'yet another new value A',
      itemB: 'yet another new value B',
    })

    set.urlValues({
      itemA: 'yet AGAIN another new value A',
    })

    expect(get.urlValues()).toEqual({
      itemA: 'yet AGAIN another new value A',
      itemB: 'yet another new value B',
    })
  })

  test('should encode/decode value correctly', () => {
    const { set, get, defaultValues } = urlParametersStateFactory<{
      itemC: number
    }>({
      itemC: {
        urlKey: 'itemC',
        defaultValue: 10,
        encode: (value: number) => encodeURIComponent(value * 20),
        decode: (value: string) => Number(decodeURIComponent(value)) / 20,
      },
    })

    expect(defaultValues).toEqual({ itemC: 10 })
    expect(get.urlValues()).toEqual({ itemC: 10 })

    set.urlValues({ itemC: 30 })
    expect(get.urlValues()).toEqual({ itemC: 30 })
  })
})
