import { urlParametersState } from '..'

const mockRegister = [
  {
    key: 'itemA',
    defaultValue: 'default value for,A',
  },
  {
    key: 'itemB',
    defaultValue: 'default value for,B',
  },
]

describe('urlParameterState', () => {
  test('should have correct default values', () => {
    const { defaultValues } = urlParametersState(mockRegister)

    expect(defaultValues).toEqual({
      itemA: 'default value for,A',
      itemB: 'default value for,B',
    })
  })

  test('getUrlValues should have correct values', () => {
    const { getUrlValues } = urlParametersState(mockRegister)

    expect(getUrlValues()).toEqual({
      itemA: 'default value for,A',
      itemB: 'default value for,B',
    })
  })

  test('setUrlValues should set values correctly', () => {
    const { setUrlValues, getUrlValues } = urlParametersState(mockRegister)

    setUrlValues({ itemA: 'new value for+A' })
    expect(getUrlValues()).toEqual({
      itemA: 'new value for+A',
      itemB: 'default value for,B',
    })

    setUrlValues({
      itemA: 'yet another new value A',
      itemB: 'yet another new value B',
    })

    expect(getUrlValues()).toEqual({
      itemA: 'yet another new value A',
      itemB: 'yet another new value B',
    })

    setUrlValues({
      itemA: 'yet AGAIN another new value A',
      notAKey: 'shouldnt have any effect',
    })

    expect(getUrlValues()).toEqual({
      itemA: 'yet AGAIN another new value A',
      itemB: 'yet another new value B',
    })
  })

  test('should encode/decode value correctly', () => {
    const { setUrlValues, getUrlValues, defaultValues } = urlParametersState([
      {
        key: 'itemC',
        defaultValue: 10,
        encode: (value: number) => encodeURIComponent(value * 20),
        decode: (value: string) => Number(decodeURIComponent(value)) / 20,
      },
    ])

    expect(defaultValues).toEqual({ itemC: 10 })
    expect(getUrlValues()).toEqual({ itemC: 10 })

    setUrlValues({ itemC: 30 })
    expect(getUrlValues()).toEqual({ itemC: 30 })
  })
})
