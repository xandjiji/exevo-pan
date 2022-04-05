import { renderHook } from '@testing-library/react-hooks'
import { setup } from 'utils/test'
import useInfiniteScroll from '..'

const fetchNextPageMock = jest.fn()
const observeMock = jest.fn()

describe('useInfiniteScroll()', () => {
  beforeEach(() => {
    fetchNextPageMock.mockClear()
    observeMock.mockClear()
  })

  test('should trigger `fetchNextPage()` only if the node is intersecting', () => {
    let isIntersecting = false

    setup.IntersectionObserver.mock({
      observe: observeMock,
      takeRecords: () => [
        {
          ...setup.IntersectionObserver.defaultTakeRecords,
          isIntersecting,
        },
      ],
    })
    const { result } = renderHook(() => useInfiniteScroll(fetchNextPageMock))

    /* element to be observed is not mounted yet */
    expect(observeMock).toHaveBeenCalledTimes(0)
    expect(fetchNextPageMock).toHaveBeenCalledTimes(0)
    result.current(undefined)
    expect(fetchNextPageMock).toHaveBeenCalledTimes(0)
    expect(observeMock).toHaveBeenCalledTimes(0)

    /* observer element is mounted, but not visible */
    result.current({})
    expect(fetchNextPageMock).toHaveBeenCalledTimes(0)
    expect(observeMock).toHaveBeenCalledTimes(1)

    /* observer element is mounted AND visible */
    isIntersecting = true
    result.current({})
    expect(fetchNextPageMock).toHaveBeenCalledTimes(1)
    expect(observeMock).toHaveBeenCalledTimes(2)

    /* observer element is mounted, but not visible again */
    isIntersecting = false
    result.current({})
    expect(fetchNextPageMock).toHaveBeenCalledTimes(1)
    expect(observeMock).toHaveBeenCalledTimes(3)
  })
})
