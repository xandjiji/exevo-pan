import { renderHook, act } from '@testing-library/react-hooks'
import { localStorageKeys } from 'Constants'
import { useTheme, ThemeProvider } from '..'

const mockGetItem = jest.fn()
const mockSetItem = jest.fn()

Object.defineProperty(window, 'localStorage', {
  configurable: true,
  writable: true,
  value: { getItem: mockGetItem, setItem: mockSetItem },
})

describe('useTheme()', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should work correctly, with empty localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current.theme).toEqual('light')
    expect(mockGetItem).toBeCalledTimes(1)
    expect(mockGetItem).toHaveBeenLastCalledWith(localStorageKeys.THEME_DATA)

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toEqual('dark')
    expect(mockSetItem).toBeCalledTimes(1)
    expect(mockSetItem).toHaveBeenLastCalledWith(
      localStorageKeys.THEME_DATA,
      'dark',
    )

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toEqual('light')
    expect(mockSetItem).toBeCalledTimes(2)
    expect(mockSetItem).toHaveBeenLastCalledWith(
      localStorageKeys.THEME_DATA,
      'light',
    )
  })

  test('should work correctly, with an initial localStorage value', () => {
    mockGetItem.mockReturnValueOnce('dark')
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current.theme).toEqual('dark')
    expect(mockGetItem).toBeCalledTimes(1)
    expect(mockGetItem).toHaveBeenLastCalledWith(localStorageKeys.THEME_DATA)

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toEqual('light')
    expect(mockSetItem).toBeCalledTimes(1)
    expect(mockSetItem).toHaveBeenLastCalledWith(
      localStorageKeys.THEME_DATA,
      'light',
    )

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toEqual('dark')
    expect(mockSetItem).toBeCalledTimes(2)
    expect(mockSetItem).toHaveBeenLastCalledWith(
      localStorageKeys.THEME_DATA,
      'dark',
    )
  })

  test('should work correctly, with an invalid localStorage value', () => {
    mockGetItem.mockReturnValueOnce('pink-theme')
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current.theme).toEqual('light')
    expect(mockGetItem).toBeCalledTimes(1)
    expect(mockGetItem).toHaveBeenLastCalledWith(localStorageKeys.THEME_DATA)

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toEqual('dark')
    expect(mockSetItem).toBeCalledTimes(1)
    expect(mockSetItem).toHaveBeenLastCalledWith(
      localStorageKeys.THEME_DATA,
      'dark',
    )

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toEqual('light')
    expect(mockSetItem).toBeCalledTimes(2)
    expect(mockSetItem).toHaveBeenLastCalledWith(
      localStorageKeys.THEME_DATA,
      'light',
    )
  })
})
