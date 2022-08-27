import { renderHook } from '@testing-library/react-hooks'
import useTime from '..'

describe('useTime()', () => {
  test('should return the correct time and seconds values', () => {
    const { result } = renderHook(() => useTime('32:17'))

    {
      const [timeObject, setTime] = result.current
      expect(timeObject).toEqual({
        time: '32:17',
        seconds: 116220,
      })
      setTime('11:59')
    }

    const [timeObject] = result.current
    expect(timeObject).toEqual({
      time: '11:59',
      seconds: 43140,
    })
  })

  test('should should cap the time at `42:00`', () => {
    const { result } = renderHook(() => useTime('32:17'))

    {
      const [, setTime] = result.current
      setTime('42:39')
    }

    const [timeObject] = result.current
    expect(timeObject).toEqual({
      time: '42:00',
      seconds: 151200,
    })
  })
})
