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

/*
[
  {
    key: 'itemA',
    defaultValue: 10,
    encode: (value: number) => encodeURIComponent(value * 20),
    decode: (value: string) => Number(decodeURIComponent(value)) / 20,
  },
  {
    key: 'itemB',
    defaultValue: 'default value for,B',
  },
]
*/

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
  })
})
