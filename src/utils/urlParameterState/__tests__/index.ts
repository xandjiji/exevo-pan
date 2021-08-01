import { urlParametersState } from '..'

describe('urlParameterState', () => {
  test('should have correct default values', () => {
    const { defaultValues } = urlParametersState([
      {
        key: 'itemA',
        defaultValue: 10,
      },
      {
        key: 'itemB',
        defaultValue: 'defaultValueForB',
      },
    ])

    expect(defaultValues).toEqual({ itemA: 10, itemB: 'defaultValueForB' })
  })
})
