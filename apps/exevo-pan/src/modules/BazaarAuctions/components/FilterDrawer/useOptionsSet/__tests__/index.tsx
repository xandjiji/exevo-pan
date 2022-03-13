import { renderHook } from '@testing-library/react-hooks'
import useOptionsSet from '..'
import { options } from './mock'

describe('useOptionsSet()', () => {
  test('should filter not selected options correctly', () => {
    const [optionA, optionB, optionC] = options

    let selectedOptions = new Set<string>([])

    const { result, rerender } = renderHook(() =>
      useOptionsSet(options, selectedOptions),
    )

    expect(result.current).toEqual(options)

    selectedOptions = new Set<string>([optionA.value])
    rerender()
    expect(result.current).toEqual([optionB, optionC])

    selectedOptions = new Set<string>([optionB.value])
    rerender()
    expect(result.current).toEqual([optionA, optionC])

    selectedOptions = new Set<string>([optionA.value, optionC.value])
    rerender()
    expect(result.current).toEqual([optionB])

    selectedOptions = new Set<string>([])
    rerender()
    expect(result.current).toEqual(options)
  })
})
